import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db";
import { route } from "./routes/ocorrencias";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

connectDB();

app.use("/ocorrencias", route);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
