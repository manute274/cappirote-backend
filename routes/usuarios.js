import express from "express";
import { createUser, deleteUser, getAllUsers, getUserbyid, login, updateUser } from "../controllers/usuarios.js";
import { verificarToken } from "../middlewares/comprobartoken.js";

const router = express.Router()

router.post('/register', createUser);
router.post('/login', login);
router.get('/usuarios', verificarToken, getAllUsers);
router.get('/usuarios/:id', verificarToken, getUserbyid);
router.put('/usuarios/:id', verificarToken, updateUser);
router.delete('/usuarios/:id', verificarToken, deleteUser);

export default router;