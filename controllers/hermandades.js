import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear una hermandad
export const createHdad = async (req, res) => {
    const { nombre, apelativo, titulares, fundacion, sede, dia, itinerario, escudo } = req.body;

    //console.log(apelativo);
    try {
        const nuevahermandad = await prisma.hermandades.create({
            data: { nombre, apelativo, fundacion, titulares, sede, dia, itinerario, escudo},
        });
        return res.status(201).json({ message: "Hermandad creada con éxito", data: nuevahermandad });
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando hermandad" });
    }
}

// Obtener todas las hermandades
export const getAllHdads = async (req, res) => {
    const hermandades = await prisma.hermandades.findMany();
    res.json(hermandades);
}

// Obtener un hermandad por ID
export const getHdadbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const hermandad = await prisma.hermandades.findUnique({ where: { id: parseInt(id) } });
        if (!hermandad) {
            return res.status(404).json({ error: "Hermandad no encontrada" });
        }
        res.json(hermandad);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo hermandad" });
    }
}

export const getHdadesbyDia = async (req, res) => {
    const {dia} = req.params;
    try {
        // Buscar hermandades que coincidan con el día proporcionado
        const hermandades = await prisma.hermandades.findMany({
            where: {
                dia: dia,
            },
        });

        res.json(hermandades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las hermandades' });
    }
}

// Actualizar un hermandad por ID
export const updateHdad = async (req, res) => {
    const { id } = req.params;
    const { nombre, apelativo, titulares, fundacion, sede, dia, itinerario } = req.body;
    try {
        const hermandadActualizado = await prisma.hermandades.update({
            where: { id: parseInt(id) },
            data: { nombre, apelativo, titulares, fundacion, sede, dia, itinerario },
        });
        res.json(hermandadActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando hermandad" });
    }
};

export const getLocationHdad = async (req, res) => {
    const { id } = req.params;

    try {
        const parsedId = BigInt(id);
        const hdadLocation = await prisma.hermandades.findUnique({
            where: { id: parsedId },
        });

        if (!hdadLocation) {
            return res.status(404).json({ error: "Hermandad no encontrada" });
        }

        if (hdadLocation.latitud == null || hdadLocation.longitud == null) {
            return res.status(400).json({
                error: "No hay datos de localización disponibles para esta hermandad"
            });
        }

        const { id: hermandadId, latitud, longitud } = hdadLocation;
        res.json({ id: hermandadId, latitud, longitud });

    } catch (error) {
        res.status(500).json({
            error: "Hubo un problema al obtener la información de la hermandad"
        });
    }
};


export const updateLocationHdad = async (req, res) => {
    const {id, latitud, longitud} = req.body;
/*     console.log("NUEVA PETI")
    console.log(id);
    console.log(latitud);
    console.log(longitud); */
    try {
        const hermandadActualizada = await prisma.hermandades.update({
            where: { id: BigInt(id) },
            data: {
              latitud,
              longitud,
            },
          });
          res.json({'mensaje': 'Todo ok'})
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Hermandad no encontrada' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar las coordenadas' });
    }
}

// Eliminar un hermandad por ID
export const deleteHdad = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.hermandades.delete({ where: { id: parseInt(id) } });
        res.json({ mensaje: "Hermandad eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando hermandad" });
    }
};