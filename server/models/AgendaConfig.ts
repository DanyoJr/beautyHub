import mongoose from "mongoose";

export interface IPausa {
  inicio: string; // HH:MM
  fim: string;    // HH:MM
}

export interface IAgendaConfig {
  id_empresa: string;
  dias_semana: number[]; // 0=Dom, 1=Seg, ..., 6=Sab
  hora_abertura: string; // HH:MM
  hora_fechamento: string; // HH:MM
  pausas: IPausa[];
}

const PausaSchema = new mongoose.Schema<IPausa>(
  {
    inicio: { type: String, required: true },
    fim: { type: String, required: true },
  },
  { _id: false },
);

const AgendaConfigSchema = new mongoose.Schema<IAgendaConfig>(
  {
    id_empresa: { type: String, required: true, unique: true, index: true },
    dias_semana: {
      type: [Number],
      required: true,
      validate: {
        validator: (v: number[]) => v.every((d) => d >= 0 && d <= 6),
        message: "Dias da semana devem ser entre 0 (Dom) e 6 (Sab)",
      },
    },
    hora_abertura: { type: String, required: true }, // "09:00"
    hora_fechamento: { type: String, required: true }, // "18:00"
    pausas: { type: [PausaSchema], default: [] },
  },
  { timestamps: true },
);

export default (mongoose.models.AgendaConfig as mongoose.Model<IAgendaConfig>) ||
  mongoose.model<IAgendaConfig>("AgendaConfig", AgendaConfigSchema);
