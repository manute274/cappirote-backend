import express from "express";
import { addImage, getImages, updateImage, deleteImage } from "../controllers/hdad_images.js";
import { verificarToken } from "../middlewares/comprobartoken.js";

const router = express.Router()

router.post('/images/:id_hdad', verificarToken, addImage);
router.get('/images/:id_hdad', getImages);
//router.get('/images/:id', updateImage);
router.delete('/images/:id_hdad/:image_url', verificarToken, deleteImage);

export default router;