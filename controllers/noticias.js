import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear una noticia
export const createNoticia = async (req, res) => {
  const { titulo, cuerpo, fecha, imagen } = req.body;

  const date = new Date(fecha);
    
  //console.log(date.toISOString);
  try {
    const nuevanoticia = await prisma.noticias.create({
      data: { titulo, cuerpo, fecha: date, imagen},
    });
    res.json(nuevanoticia);

  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
        res.status(500).json({})
    }
    res.status(500).json({ error: "Error creando noticia" });
  }
}

// Obtener todas las noticias
export const getAllNoticias = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; 
        const salto = (page - 1) * limit;
    
        const totalNoticias = await prisma.noticias.count();

        const noticias = await prisma.noticias.findMany({
          skip: salto,   // Omite los primeros N elementos
          take: limit,  // Limita el número de elementos devueltos
          orderBy: {
            fecha: 'desc',
          }
        });
    
        // Responder con los datos y la información de la paginación
        res.json({
          total: totalNoticias,
          page: page,
          limit: limit,
          totalPages: Math.ceil(totalNoticias / limit),
          data: noticias,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener noticias' });
      }
}

//Buscar Noticia
export const buscarNoticia = async (req, res) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;  // Página, por defecto 1
    const limit = parseInt(req.query.limit) || 10;  // Límite de noticias por página, por defecto 10
    const salto = (page - 1) * limit;  // Cálculo del salto

    const totalNoticias = await prisma.noticias.count();

    const noticias = await prisma.noticias.findMany({
      where: {
        OR: [
          {
            titulo: {
              contains: search, 
              //mode: 'insensitive',
            },
          },
          {
            cuerpo: {
              contains: search,
              //mode: 'insensitive',
            },
          },
        ],
      },
      skip: salto,
      take: limit,
    });

    // Responder con los datos y la información de la paginación
    res.json({
      total_resultados: totalNoticias,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalNoticias / limit),
      data: noticias,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener noticias' });
  }

}

// Obtener un noticia por ID
export const getNoticiabyid = async (req, res) => {
    const { id } = req.params;
    try {
        const noticia = await prisma.noticias.findUnique({ where: { id: parseInt(id) } });
        if (!noticia) {
            return res.status(404).json({ error: "Noticia no encontrada" });
        }
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo noticia" });
    }
}

// Actualizar un noticia por ID
export const updateNoticia = async (req, res) => {
    const { id } = req.params;
    const { titulo, cuerpo, fecha, imagen } = req.body;
    const date = new Date(fecha);
    try {
        const noticiaActualizada = await prisma.noticias.update({
            where: { id: parseInt(id) },
            data: { titulo, cuerpo, fecha: date, imagen },
        });
        res.json(noticiaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando noticia" });
    }
};

// Eliminar un noticia por ID
export const deleteNoticia = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.noticias.delete({ where: { id: parseInt(id) } });
        res.json({ mensaje: "Noticia eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando noticia" });
    }
};