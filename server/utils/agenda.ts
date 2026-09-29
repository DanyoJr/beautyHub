import { Agenda } from "agenda";
import { MongoBackend } from "@agendajs/mongo-backend";

let agendaInstance: Agenda | null = null;
let agendaPromise: Promise<Agenda> | null = null;

export const getAgenda = async (): Promise<Agenda> => {
  if (agendaPromise) return agendaPromise;

  const config = useRuntimeConfig();
  
  // Na versão 6.x do Agenda, o backend de MongoDB foi movido para um pacote separado.
  const backend = new MongoBackend({
    address: config.mongoUri,
    collection: "agendaJobs"
  });

  agendaInstance = new Agenda({ backend });

  agendaPromise = new Promise((resolve, reject) => {
    agendaInstance!.on("ready", () => {
      resolve(agendaInstance!);
    });
    agendaInstance!.on("error", (err) => {
      reject(err);
    });
  });

  return agendaPromise;
};

