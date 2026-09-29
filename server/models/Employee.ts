import mongoose from "mongoose";

export interface IPausa {
  inicio: string; // HH:MM
  fim: string;    // HH:MM
}

export interface IEmployee {
  id_funcionario: string;
  id_empresa: string;
  nome: string;
  idade: number;
  foto?: string;
  dias_semana: number[]; // 0=Dom, 1=Seg, ..., 6=Sab
  hora_abertura: string; // HH:MM
  hora_fechamento: string; // HH:MM
  pausas: IPausa[];
  ativo: boolean;
}

const PausaSchema = new mongoose.Schema<IPausa>(
  {
    inicio: { type: String, required: true },
    fim: { type: String, required: true },
  },
  { _id: false },
);

const EmployeeSchema = new mongoose.Schema<IEmployee>(
  {
    id_funcionario: { type: String, required: true, unique: true },
    id_empresa: { type: String, required: true, index: true },
    nome: { type: String, required: true, maxlength: 100 },
    idade: { type: Number, required: true },
    foto: { type: String, required: false }, // URL ou Base64
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
    ativo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default (mongoose.models.Employee as mongoose.Model<IEmployee>) ||
  mongoose.model<IEmployee>("Employee", EmployeeSchema);
