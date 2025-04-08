import express from "express";
import cors from "cors";
import { swaggerUi, swaggerSpec } from './swagger.js';
import swaggerDocument from './openapi.json' with { type: "json" };
import userRouter from "./routes/usuarios.js";
import hdadRouter from "./routes/hermandades.js";
import devotosRouter from "./routes/devotos.js";
import noticiasRouter from "./routes/noticias.js";
//import noticiashdadRouter from "./routes/noticiashdad.js";
//import bandasRouter from "./routes/bandas.js";
//import seguidoresRouter from "./routes/seguidores.js";
//import contratosRouter from "./routes/contratos.js";
//import marchasRouter from "./routes/marchas.js";
//import repertorioRouter from "./routes/repertorio.js";
import eventosRouter from "./routes/eventos.js";
import hdad_ImagesRouter from "./routes/hdad_images.js";


//Para pasar los BigInt de la BD a Number en los JSON
BigInt.prototype.toJSON = function () { return Number(this) }


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/", userRouter);
app.use("/api/", hdadRouter);
app.use("/api/", devotosRouter);
app.use("/api/", noticiasRouter);
//app.use("/api/", noticiashdadRouter);
//app.use("/api/", bandasRouter);
//app.use("/api/", seguidoresRouter);
//app.use("/api/", contratosRouter);
//app.use("/api/", marchasRouter);
//app.use("/api/", repertorioRouter);
app.use("/api/", eventosRouter);
app.use("/api/", hdad_ImagesRouter);


app.get ("/api/", (req, res)=>{res.json("Funciona")})

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});