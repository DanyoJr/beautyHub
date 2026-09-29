import mongoose from "mongoose";

export type AppointmentStatus = "aberto" | "concluido" | "cancelado";

export interface IAppointment {
  id_agendamento: string;
  id_empresa: string;
  id_cliente: string;
  id_servico: string;
  id_funcionario?: string; // Add id_funcionario
  data_hora_inicio: Date;
  data_hora_fim: Date;
  status: AppointmentStatus;
  avaliado: boolean;
}

const AppointmentSchema = new mongoose.Schema<IAppointment>(
  {
    id_agendamento: { type: String, required: true, unique: true },
    id_empresa: { type: String, required: true, index: true },
    id_cliente: { type: String, required: true, index: true },
    id_servico: { type: String, required: true },
    id_funcionario: { type: String, required: false, index: true }, // Add id_funcionario
    data_hora_inicio: { type: Date, required: true },
    data_hora_fim: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["aberto", "concluido", "cancelado"],
      default: "aberto",
    },
    avaliado: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

// Índice composto para prevenção de overbooking
// Agora inclui id_funcionario para que 2 funcionários possam atender ao mesmo tempo
AppointmentSchema.index(
  { id_empresa: 1, id_funcionario: 1, data_hora_inicio: 1, status: 1 },
  { name: "idx_overbooking" },
);

export default (mongoose.models.Appointment as mongoose.Model<IAppointment>) ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
