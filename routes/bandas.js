import express from "express";
import { createBanda, deleteBanda, getAllBandas, getBandabyid, updateBanda } from "../controllers/bandas.js";
import { verificarToken } from "../middlewares/comprobartoken.js";

const router = express.Router()

router.post('/bandas', verificarToken, createBanda);
router.get('/bandas', getAllBandas);
router.get('/bandas/:id', getBandabyid);
router.put('/bandas/:id', verificarToken, updateBanda);
router.delete('/bandas/:id', verificarToken, deleteBanda);

export default router;