import crypto from "node:crypto";
import { createError } from "h3";
import BookingLock from "~~/server/models/BookingLock";

export interface LockOptions {
  /** Tempo máximo de validade do lock em milissegundos (padrão: 10s). */
  ttlMs?: number;
  /** Número máximo de tentativas para adquirir o lock (padrão: 20). */
  maxRetries?: number;
  /** Intervalo base entre tentativas em ms (padrão: 60ms). */
  retryDelayMs?: number;
}

export class LockAcquisitionError extends Error {
  readonly statusCode = 409;

  constructor(message = "Recurso temporariamente em uso. Tente novamente em instantes.") {
    super(message);
    this.name = "LockAcquisitionError";
  }
}

export function isDuplicateKeyError(error: any): boolean {
  return error?.code === 11000 || error?.cause?.code === 11000;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Executa uma função crítica sob um lock distribuído persistido no MongoDB.
 * Compatível com qualquer instância MongoDB (standalone, Replica Set ou Atlas),
 * sem exigir transações multi-documento nem Redis.
 */
export async function withMongoLock<T>(
  key: string,
  fn: () => Promise<T>,
  options: LockOptions = {},
): Promise<T> {
  const ttlMs = options.ttlMs ?? 10_000;
  const maxRetries = options.maxRetries ?? 20;
  const retryDelayMs = options.retryDelayMs ?? 60;
  const owner = crypto.randomUUID();

  let acquired = false;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttlMs);

    try {
      // Adquire o lock atomicamente se ele não existir ou se já tiver expirado.
      // Se já existir um lock ativo (expiresAt > now), o filtro não casa e o upsert
      // tenta inserir com o mesmo _id, disparando erro 11000 (Duplicate Key).
      await BookingLock.findOneAndUpdate(
        { _id: key, expiresAt: { $lte: now } },
        { $set: { owner, expiresAt } },
        { upsert: true },
      );
      acquired = true;
      break;
    } catch (error: any) {
      if (!isDuplicateKeyError(error)) {
        throw error;
      }

      if (attempt < maxRetries) {
        const jitter = Math.floor(Math.random() * 40);
        await sleep(retryDelayMs + jitter);
      }
    }
  }

  if (!acquired) {
    throw createError({
      statusCode: 409,
      message: "Este horário está sendo processado no momento. Tente novamente em instantes.",
    });
  }

  try {
    return await fn();
  } finally {
    // Libera somente se este processo ainda for o dono do lock
    await BookingLock.deleteOne({ _id: key, owner }).catch((err) => {
      console.error(`[Lock] Erro ao liberar lock ${key}:`, err);
    });
  }
}
