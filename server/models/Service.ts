import mongoose from "mongoose";

export interface IService {
  id_servico: string;
  id_empresa: string;
  nome_servico: string;
  descricao_servico?: string;
  imagem_servico?: string;
  valor_servico: number;
  duracao_minutos: number;
  ativo: boolean;
}

const ServiceSchema = new mongoose.Schema<IService>(
  {
    id_servico: { type: String, required: true, unique: true },
    id_empresa: { type: String, required: true, index: true },
    nome_servico: { type: String, required: true, maxlength: 100 },
    descricao_servico: { type: String, required: false, maxlength: 500 },
    imagem_servico: { type: String, required: false },
    valor_servico: { type: Number, required: true, min: 0 },
    duracao_minutos: { type: Number, required: true, min: 5 },
    ativo: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

export default (mongoose.models.Service as mongoose.Model<IService>) ||
  mongoose.model<IService>("Service", ServiceSchema);
