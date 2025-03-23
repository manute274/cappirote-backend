import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear una marcha
export const createMarcha = async (req, res) => {
    const { nombre, autor, link } = req.body;

    //console.log(apelativo);
    try {
        const nuevamarcha = await prisma.marchas.create({
            data: { nombre, autor, link },
        });
        res.json(nuevamarcha);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando marcha" });
    }
}

// Obtener todas las marchas
export const getAllMarchas = async (req, res) => {
    const marchas = await prisma.marchas.findMany();
    res.json(marchas);
}

// Obtener una marcha por ID
export const getMarchabyid = async (req, res) => {
    const { id } = req.params;
    try {
        const marcha = await prisma.marchas.findUnique({ where: { id: parseInt(id) } });
        if (!marcha) {
            return res.status(404).json({ error: "Marcha no encontrado" });
        }
        res.json(marcha);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo marcha" });
    }
}

// Actualizar un marcha por ID
export const updateMarcha = async (req, res) => {
    const { id } = req.params;
    const { nombre, autor, link } = req.body;
    try {
        const marchaActualizado = await prisma.marchas.update({
            where: { id: parseInt(id) },
            data: { nombre, autor, link },
        });
        res.json(marchaActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando marcha" });
    }
};

// Eliminar un marcha por ID
export const deleteMarcha = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.marchas.delete({ where: { id: parseInt(id) } });
        res.json({ mensaje: "Marcha eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando marcha" });
    }
};