import mongoose from "mongoose";

export interface IEnterprise {
  id_empresa: string;
  email_empresa: string;
  telefone_empresa: number;
  cnpj_cpf_empresa?: string;
  nome_empresa: string;
  categoria_empresa: string;
  status_empresa: "Ativo" | "Inativo";
  imagem_empresa?: string;
  descricao_empresa: string;
  local: {
    cep_empresa: number;
    logadouro_empresa: string;
    numero_empresa: number;
    complemento_empresa?: string;
    bairro_empresa: string;
    cidade_empresa: string;
    uf_empresa: string;
  };
}

const EnterpriseSchema = new mongoose.Schema<IEnterprise>(
  {
    id_empresa: { type: String, required: true, unique: true },
    email_empresa: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    telefone_empresa: { type: Number, required: true },
    cnpj_cpf_empresa: { type: String, required: false },
    nome_empresa: { type: String, required: true, maxlength: 100 },
    categoria_empresa: { type: String, required: true },
    status_empresa: {
      type: String,
      required: true,
      enum: ["Ativo", "Inativo"],
      default: "Ativo",
    },
    imagem_empresa: { type: String, required: false },
    descricao_empresa: { type: String, required: true },
    local: {
      cep_empresa: { type: Number, required: true },
      logadouro_empresa: { type: String, required: true },
      numero_empresa: { type: Number, required: true },
      complemento_empresa: { type: String, required: false },
      bairro_empresa: { type: String, required: true },
      cidade_empresa: { type: String, required: true },
      uf_empresa: { type: String, required: true, maxlength: 2 },
    },
  },
  { timestamps: true },
);

export default (mongoose.models.Enterprise as mongoose.Model<IEnterprise>) ||
  mongoose.model<IEnterprise>("Enterprise", EnterpriseSchema);
