import express from "express";
import { createHdad, deleteHdad, getAllHdads, getHdadbyid, getHdadesbyDia, 
    getLocationHdad, updateHdad, updateLocationHdad } from "../controllers/hermandades.js";
import { verificarToken } from "../middlewares/comprobartoken.js";

const router = express.Router()

router.post('/hermandades', verificarToken, createHdad);
router.get('/hermandades', getAllHdads);
router.get('/hermandades/:id', getHdadbyid);
router.get('/hermandades/dia/:dia', getHdadesbyDia);
router.put('/hermandades/:id', verificarToken, updateHdad);
router.delete('/hermandades/:id', verificarToken, deleteHdad);
router.patch('/hermandades/updatelocation', verificarToken, updateLocationHdad);
router.get('/hermandades/location/:id', getLocationHdad);

export default router;