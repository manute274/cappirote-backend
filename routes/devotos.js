import express from "express";
import { createDevoto, deleteDevoto, getAllDevotos, getDevotobyUserid, getDevotobyHdadid, checkDevoto/*, updateDevoto*/ } from "../controllers/devotos.js";
import { verificarToken } from "../middlewares/comprobartoken.js";

const router = express.Router()

router.post('/devotos', verificarToken, createDevoto);
router.get('/devotos', getAllDevotos);
router.get('/devotos/user/:id_usuario', getDevotobyUserid);
router.get('/devotos/hdad/:id_hdad', getDevotobyHdadid);
router.post('/devotos/comprobarrelacion', checkDevoto);
//router.put('/devotos/:id', updateDevoto);
router.delete('/devotos/:id_hdad/usuario/:id_usuario', verificarToken, deleteDevoto);

export default router;