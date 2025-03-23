import express from "express";
import { createNoticiaHdad, deleteNoticiaHdad, getAllNoticiasHdad, 
    getNoticiaHdadbyHdadid/*, updateNoticiaHdad*/ } from "../controllers/noticiashdad.js";

const router = express.Router()

router.post('/noticiahdads', createNoticiaHdad);
router.get('/noticiahdads', getAllNoticiasHdad);
//router.get('/NoticiaHdads/noticia/:id_noticia', getNoticiaHdadbyNoticiaid);
router.get('/noticiahdads/hdad/:id_hdad', getNoticiaHdadbyHdadid);
//router.put('/NoticiaHdads/:id', updateNoticiaHdad);
router.delete('/noticiahdads/', deleteNoticiaHdad);

export default router;