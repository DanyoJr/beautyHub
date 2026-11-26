import mongoose from "mongoose";

export interface IRate {
  id_agendamento?: string;
  starsCounting: string;
  comment?: string;
  userID: string;
  enterpriseID: string;
}

const RateSchema = new mongoose.Schema<IRate>(
  {
    id_agendamento: { type: String, required: false },
    starsCounting: { type: String, required: true },
    comment: { type: String, required: false, default: "" },
    userID: { type: String, required: true },
    enterpriseID: { type: String, required: true },
  },
  { timestamps: true },
);

// Garante no nível do banco apenas 1 avaliação por agendamento (RN09),
// preservando compatibilidade com documentos antigos sem id_agendamento.
RateSchema.index(
  { id_agendamento: 1 },
  {
    name: "idx_rate_unique_appointment",
    unique: true,
    partialFilterExpression: { id_agendamento: { $type: "string" } },
  },
);

export default (mongoose.models.Rate as mongoose.Model<IRate>) ||
  mongoose.model<IRate>("Rate", RateSchema);
