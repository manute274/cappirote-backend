import express from "express";
import { createRepertorio, deleteRepertorio, getAllRepertorios, getRepertoriobyBandaid, 
    getRepertoriobyMarchaid/*, updateRepertorio*/ } from "../controllers/repertorio.js";

const router = express.Router()

router.post('/repertorio', createRepertorio);
router.get('/repertorio', getAllRepertorios);
router.get('/repertorio/banda/:id_banda', getRepertoriobyBandaid);
router.get('/repertorio/marcha/:id_marcha', getRepertoriobyMarchaid);
//router.put('/repertorio/:id', updateRepertorio);
router.delete('/repertorio/', deleteRepertorio);

export default router;