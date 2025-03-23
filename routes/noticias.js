import express from "express";
import { buscarNoticia, createNoticia, deleteNoticia, getAllNoticias, getNoticiabyid, updateNoticia } from "../controllers/noticias.js";

const router = express.Router()

router.post('/noticias', createNoticia);
router.get('/noticias', getAllNoticias);
router.get('/noticias/search', buscarNoticia);
router.get('/noticias/:id', getNoticiabyid);
router.put('/noticias/:id', updateNoticia);
router.delete('/noticias/:id', deleteNoticia);

export default router;