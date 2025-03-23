import express from "express";
import { createMarcha, deleteMarcha, getAllMarchas, getMarchabyid, updateMarcha } from "../controllers/marchas.js";

const router = express.Router()

router.post('/marchas', createMarcha);
router.get('/marchas', getAllMarchas);
router.get('/marchas/:id', getMarchabyid);
router.put('/marchas/:id', updateMarcha);
router.delete('/marchas/:id', deleteMarcha);

export default router;