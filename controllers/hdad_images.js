import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear una nueva imagen
export const addImage = async (req, res) => {
  const { id_hdad } = req.params;
  const { image_urls } = req.body;

  if (!image_urls || image_urls.length === 0) {
    return res.status(400).json({ error: 'Debe proporcionar al menos una URL de imagen' });
  }
  
  try {
    const newImages = await prisma.hdad_images.createMany({
      data: image_urls.map(image_url => ({
        id_hdad,
        image_url
      }))
    });
    res.status(201).json({message: 'Imagenes añadida correctamente'});
  } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          res.status(409).json({ error: 'La imagen ya existe en la base de datos' });
        }
      } else {
        res.status(500).json({ error: 'Error añadiendo las imagenes' });
      }
      
  }
}

// Obtener todas las imágenes de una hermandad
//app.get'/images/:id_hdad',
export const getImages = async (req, res) => {
    const { id_hdad } = req.params;

    try {
      const images = await prisma.hdad_images.findMany({
        where: {
          id_hdad: BigInt(id_hdad)
        },
        select: {
          image_url: true,
        }
      });
      if (images.length === 0) {
        return res.status(404).json({ message: 'No se encontraron imágenes' });
      }

      res.status(200).json({ urls: images.map(image => image.image_url) });
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo las imágenes' });
    }
}

// Actualizar la URL de una imagen
//app.put('/images/:id_hdad/:image_url'
export const updateImage = async (req, res) => {
    const { id_hdad, image_url } = req.params;
    const { newImageUrl } = req.body;
    
    try {
      const updatedImage = await prisma.hdad_images.update({
        where: {
          id_hdad_image_url: {
            id_hdad: BigInt(id_hdad),
            image_url
          }
        },
        data: {
          image_url: newImageUrl
        }
      });
      res.status(200).json(updatedImage);
    } catch (error) {
      res.status(500).json({ error: 'Error actualizando la imagen' });
    }
}
  
// Eliminar una imagen
// app.delete('/images/:id_hdad/:image_url'
export const deleteImage = async (req, res) => {
    const { id_hdad } = req.params;
    const { image_url } = req.body;
    console.log(image_url);
    try {
      const deletedImage = await prisma.hdad_images.delete({
        where: {
          id_hdad_image_url: {
            id_hdad: BigInt(id_hdad),
            image_url
          }
        }
      });
      res.status(200).json({message: "Imagen borrada con éxito"});
    } catch (error) {
      res.status(500).json({ error: 'Error eliminando la imagen' });
    }
}