import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { Ocorrencia } from "../models/Ocorrencia";

export const route = Router();

//configurando o multer (upload de imagens)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

route.post("/", upload.single("foto"), async (req: Request, res: Response) => {
  try {
    const fotoPath = req.file ? req.file.path : null;

    const novaOcorrencia = new Ocorrencia({
      ...req.body,
      foto: fotoPath,
    });

    await novaOcorrencia.save();
    res.status(201).json(novaOcorrencia);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao salvar Ocorrência", details: error });
  }
});

route.get("/", async (req: Request, res: Response) => {
  try {
    const ocorrencias = await Ocorrencia.find().sort({ createdAt: -1 });
    res.json(ocorrencias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar ocorrências" });
  }
});

route.get("/:id", async (req: Request, res: Response) => {
  try {
    const ocorrencia = await Ocorrencia.findById(req.params.id);
    if (!ocorrencia) {
      return res.status(404).json({ message: "Ocorrencia não encontrada" });
    }
    res.json(ocorrencia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar ocorrência" });
  }
});

route.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Ocorrencia.findByIdAndDelete(req.params.id);
    res.json({ message: "Ocorrência deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar" });
  }
});

route.put(
  "/:id",
  upload.single("foto"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = { ...req.body };

      if (req.file) {
        updates.foto = req.file.path;
      }

      if (req.body["publico[estimado]"]) {
        updates.publico = {
          estimado: req.body["publico[estimado]"],
          presente: req.body["publico[presente]"],
        };
      }

      const ocorrenciaAtualizada = await Ocorrencia.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );

      if (!ocorrenciaAtualizada) {
        return res.status(404).json({ message: "Ocorrência não encontrada" });
      }

      res.json(ocorrenciaAtualizada);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao atualizar ocorrência", details: error });
    }
  }
);
