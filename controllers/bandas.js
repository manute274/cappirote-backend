import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear una banda
export const createBanda = async (req, res) => {
    const { nombre, fundacion, num_componentes, tipo } = req.body;

    //console.log(apelativo);
    try {
        const nuevabanda = await prisma.bandas.create({
            data: { nombre, fundacion, num_componentes, tipo},
        });
        res.json(nuevabanda);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando banda" });
    }
}

// Obtener todas las bandas
export const getAllBandas = async (req, res) => {
    const bandas = await prisma.bandas.findMany();
    res.json(bandas);
}

// Obtener una banda por ID
export const getBandabyid = async (req, res) => {
    const { id } = req.params;
    try {
        const banda = await prisma.bandas.findUnique({ where: { id: parseInt(id) } });
        if (!banda) {
            return res.status(404).json({ error: "Banda no encontrado" });
        }
        res.json(banda);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo banda" });
    }
}

// Actualizar una banda por ID
export const updateBanda = async (req, res) => {
    const { id } = req.params;
    const { nombre, fundacion, num_componentes, tipo } = req.body;
    try {
        const bandaActualizada = await prisma.bandas.update({
            where: { id: parseInt(id) },
            data: { nombre, fundacion, num_componentes, tipo },
        });
        res.json(bandaActualizada);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando banda" });
    }
};

// Eliminar una banda por ID
export const deleteBanda = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.bandas.delete({ where: { id: parseInt(id) } });
        res.json({ mensaje: "Banda eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando banda" });
    }
};