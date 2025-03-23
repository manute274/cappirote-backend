import express from "express";
import { createContrato, deleteContrato, getAllContratos, getContratobyHdadid, getContratobyBandaid /*, updateContrato*/ } from "../controllers/contratos.js";

const router = express.Router()

router.post('/contratos', createContrato);
router.get('/contratos', getAllContratos);
router.get('/contratos/hdad/:id_hdad', getContratobyHdadid);
router.get('/contratos/banda/:id_banda', getContratobyBandaid);
//router.put('/contratos/:id', updateContrato);
router.delete('/contratos/', deleteContrato);

export default router;