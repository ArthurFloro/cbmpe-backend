import mongoose, { Document, Schema } from "mongoose";

export interface IOcorrencia extends Document {
  tipoFormulario: "PREVENCAO" | "ATIVIDADE_COMUNITARIA";
  numeroAviso: string;
  nomeEvento: string;

  dataChegada?: string;
  dataInicio: string;
  dataSaida?: string;
  periodo?: string;

  latitude: number;
  longitude: number;
  foto?: string;

  responsavelEvento: {
    nome: string;
    cpfCnpj: string;
    arAvcb: string;
  };

  publico: {
    estimado: number;
    presente: number;
  };

  codigoCGO: string;

  prevencaoAquatica?: string;
  eventoTipo?: string;

  tipoInteracao?: string;

  servicosRealizados: string;
  viaturasEmpregadas: string;
  efetivo: number;

  informacoesAdicionais?: string;
  responsavelGuarnicao: string;

  createdAt: Date;
}

const OcorrenciaSchema = new Schema({
  tipoFormulario: {
    type: String,
    required: true,
    enum: ["PREVENCAO", "ATIVIDADE_COMUNITARIA"],
  },
  numeroAviso: { type: String, required: true },
  nomeEvento: { type: String, required: true },

  dataChegada: String,
  dataInicio: String,
  dataSaida: String,
  periodo: String,

  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  foto: String,

  responsavelEvento: {
    nome: String,
    cpfCnpj: String,
    arAvcb: String,
  },
  publico: {
    estimado: Number,
    presente: Number,
  },

  codigoCGO: { type: String, required: true },

  prevencaoAquatica: String,
  eventoTipo: String,
  tipoInteracao: String,

  servicosRealizados: { type: String, required: true },
  viaturasEmpregadas: { type: String, required: true },
  efetivo: Number,

  informacoesAdicionais: String,
  responsavelGuarnicao: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

export const Ocorrencia = mongoose.model<IOcorrencia>(
  "Ocorrencia",
  OcorrenciaSchema
);
