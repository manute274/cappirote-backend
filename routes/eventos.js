import express from "express";
import { createEvents, deleteEvent, getAllEvents, getEventsbyId, updateEvent } from "../controllers/eventos.js";
import { verificarToken } from "../middlewares/comprobartoken.js";

const router = express.Router()

router.post('/eventos', verificarToken, createEvents);
router.get('/eventos', getAllEvents);
router.get('/eventos/:id', getEventsbyId);
router.put('/eventos/:id', verificarToken, updateEvent);
router.delete('/eventos/:id', verificarToken, deleteEvent);

export default router;