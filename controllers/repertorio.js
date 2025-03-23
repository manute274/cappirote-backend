import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un repertorio
export const createRepertorio = async (req, res) => {
    const { id_banda, id_marcha } = req.body;

    //Comprobar si existe el repertorio
    const banda = await prisma.bandas.findUnique({where: {id: id_banda,}})
    const marcha = await prisma.marchas.findUnique({where: {id: id_marcha,}})
    if ((banda == null) || (marcha == null)) {
        res.status(500).json({error: "Banda o marcha no existente"});
        return
    }

    //Si no existe lo creo
    try {
        const nuevorepertorio = await prisma.repertorio.create({
            data: { id_banda, id_banda},
        });
        res.json(nuevorepertorio);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando repertorio" });
    }
}

// Obtener todos los repertorios
export const getAllRepertorios = async (req, res) => {
    const repertorios = await prisma.repertorio.findMany();
    res.json(repertorios);
}

// Obtener las Bandas que sigue un Usuario
export const getRepertoriobyBandaid = async (req, res) => {
    const { id_banda } = req.params;
    try {
        const repertorio = await prisma.repertorio.findMany({ where: { id_banda: parseInt(id_banda) } });
        if (repertorio.length == 0) {
            return res.status(404).json({ error: "Repertorio no encontrado" });
        }
        res.json(repertorio);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo repertorio" });
    }
}

//Obtener los Usuarios que siguen a una Banda
export const getRepertoriobyMarchaid = async (req, res) => {
    const { id_marcha } = req.params;
    try {
        const repertorio = await prisma.repertorio.findMany({ where: { id_marcha: parseInt(id_marcha) } });
        if (repertorio.length == 0) {
            return res.status(404).json({ error: "Repertorio no encontrado" });
        }
        res.json(repertorio);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo repertorio" });
    }
}

// Eliminar un repertorio por ID
export const deleteRepertorio = async (req, res) => {
    const { id_banda, id_marcha } = req.body;
    try {
        await prisma.repertorio.delete({
            where: {
                id_banda_id_marcha: {id_banda, id_marcha}
            },
        });

        res.json({ mensaje: "Repertorio eliminado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error eliminando repertorio" });
    }
};