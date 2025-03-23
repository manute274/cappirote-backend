import express from "express";
import { createHdad, deleteHdad, getAllHdads, getHdadbyid, getHdadesbyDia, 
    getLocationHdad, updateHdad, updateLocationHdad } from "../controllers/hermandades.js";

const router = express.Router()

router.post('/hermandades', createHdad);
router.get('/hermandades', getAllHdads);
router.get('/hermandades/:id', getHdadbyid);
router.get('/hermandades/dia/:dia', getHdadesbyDia);
router.put('/hermandades/:id', updateHdad);
router.delete('/hermandades/:id', deleteHdad);
router.patch('/hermandades/updatelocation', updateLocationHdad);
router.get('/hermandades/location/:id', getLocationHdad);

export default router;