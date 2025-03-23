import express from "express";
import { createSeguidor, deleteSeguidor, getAllSeguidores, getSeguidorbyUserid, getSeguidorbyHdadid/*, updateSeguidor*/ } from "../controllers/seguidores.js";

const router = express.Router()

router.post('/seguidores', createSeguidor);
router.get('/seguidores', getAllSeguidores);
router.get('/seguidores/user/:id_usuario', getSeguidorbyUserid);
router.get('/seguidores/banda/:id_banda', getSeguidorbyHdadid);
//router.put('/seguidores/:id', updateSeguidor);
router.delete('/seguidores/', deleteSeguidor);

export default router;