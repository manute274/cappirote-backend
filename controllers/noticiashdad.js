import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear una NoticiaHdad
export const createNoticiaHdad = async (req, res) => {
    const { id_noticia, id_hdad } = req.body;

    //Comprobar si existe
    const noticia = await prisma.noticias.findUnique({where: {id: id_noticia,}})
    const hdad = await prisma.hermandades.findUnique({where: {id: id_hdad,}})
    if ((noticia == null) || (hdad == null)) {
        res.status(500).json({error: "Noticia o hermandad no existente"});
        return
    }

    //Si no existe la creo
    try {
        const nuevaNoticiaHdad = await prisma.noticiashdad.create({
            data: { id_noticia, id_hdad},
        });
        res.json(nuevaNoticiaHdad);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando NoticiaHdad" });
    }
}

// Obtener todas las NoticiasHdads
export const getAllNoticiasHdad = async (req, res) => {
    const noticiashdad = await prisma.noticiashdad.findMany();
    res.json(noticiashdad);
}

//Obtener las Noticias de una Hdad
export const getNoticiaHdadbyHdadid = async (req, res) => {
    const { id_hdad } = req.params;
    try {
        const NoticiaHdad = await prisma.noticiashdad.findMany({ where: { id_hdad: parseInt(id_hdad) } });
        if (NoticiaHdad.length == 0) {
            return res.status(404).json({ error: "NoticiaHdad no encontrada" });
        }
        res.json(NoticiaHdad);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo NoticiaHdad" });
    }
}

// Eliminar una NoticiaHdad por ID
export const deleteNoticiaHdad = async (req, res) => {
    const { id_noticia, id_hdad } = req.body;
    try {
        await prisma.noticiashdad.delete({
            where: {
                id_noticia_id_hdad: {id_noticia, id_hdad}
            },
        });

        res.json({ mensaje: "NoticiaHdad eliminada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error eliminando NoticiaHdad" });
    }
};