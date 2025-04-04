import express from "express";
import { buscarNoticia, createNoticia, deleteNoticia, getAllNoticias, getNoticiabyid, updateNoticia } from "../controllers/noticias.js";
import { verificarToken } from "../middlewares/comprobartoken.js";

const router = express.Router()

router.post('/noticias', verificarToken, createNoticia);
router.get('/noticias', getAllNoticias);
router.get('/noticias/search', buscarNoticia);
router.get('/noticias/:id', getNoticiabyid);
router.put('/noticias/:id', verificarToken, updateNoticia);
router.delete('/noticias/:id', verificarToken, deleteNoticia);

export default router;