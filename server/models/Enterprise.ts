import mongoose from "mongoose";

export interface IEnterprise {
  id_empresa: string;
  email_empresa: string;
  telefone_empresa: number;
  nome_empresa: string;
  categoria_empresa: string;
  status_empresa: string;
  avaliacao_empresa: string;
  imagem_empresa: string;
  descricao_empresa: string;
  local: {
    cep_empresa: number;
    logadouro_empresa: string;
    numero_empresa: number;
    bairro_empresa: string;
    cidade_empresa: string;
    uf_empresa: string;
  };
}

const EnterpriseSchema = new mongoose.Schema<IEnterprise>(
  {
    id_empresa: { type: String, required: true, maxlenght: [8], unique: true },
    email_empresa: {
      type: String,
      required: true,
      maxlenght: [100],
      unique: true,
    },
    telefone_empresa: { type: Number, required: true, maxlenght: [11] },
    nome_empresa: { type: String, required: true, maxlenght: [100] },
    categoria_empresa: { type: String, required: true },
    status_empresa: { type: String, required: true },
    avaliacao_empresa: { type: String, required: true, maxlenght: [3] },
    imagem_empresa: { type: String, required: true, maxlenght: [1] },
    descricao_empresa: { type: String, required: true },
    local: {
      cep_empresa: { type: Number, required: true, maxlenght: [8] },
      logadouro_empresa: { type: String, required: true },
      numero_empresa: { type: Number, required: true },
      bairro_empresa: { type: String, required: true },
      cidade_empresa: { type: String, required: true },
      uf_empresa: { type: String, required: true, maxlenght: [2] },
    },
  },
  { timestamps: true },
);

export default (mongoose.models.Enterprise as mongoose.Model<IEnterprise>) ||
  mongoose.model<IEnterprise>("Enterprise", EnterpriseSchema);
