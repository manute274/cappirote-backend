import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un seguidor
export const createSeguidor = async (req, res) => {
    const { id_usuario, id_banda } = req.body;

    //Comprobar si existe el seguidor
    const user = await prisma.usuarios.findUnique({where: {id: id_usuario,}})
    const banda = await prisma.bandas.findUnique({where: {id: id_banda,}})
    if ((user == null) || (banda == null)) {
        res.status(500).json({error: "Usuario o banda no existente"});
        return
    }

    //Si no existe lo creo
    try {
        const nuevoseguidor = await prisma.seguidores.create({
            data: { id_usuario, id_banda},
        });
        res.json(nuevoseguidor);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando seguidor" });
    }
}

// Obtener todos los seguidors
export const getAllSeguidores = async (req, res) => {
    const seguidors = await prisma.seguidores.findMany();
    res.json(seguidors);
}

// Obtener las Bandas que sigue un Usuario
export const getSeguidorbyUserid = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const seguidor = await prisma.seguidores.findMany({ where: { id_usuario: parseInt(id_usuario) } });
        if (seguidor.length == 0) {
            return res.status(404).json({ error: "Seguidor no encontrado" });
        }
        res.json(seguidor);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo seguidor" });
    }
}

//Obtener los Usuarios que siguen a una Banda
export const getSeguidorbyHdadid = async (req, res) => {
    const { id_banda } = req.params;
    try {
        const seguidor = await prisma.seguidores.findMany({ where: { id_banda: parseInt(id_banda) } });
        if (seguidor.length == 0) {
            return res.status(404).json({ error: "Seguidor no encontrado" });
        }
        res.json(seguidor);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo seguidor" });
    }
}

// Eliminar un seguidor por ID
export const deleteSeguidor = async (req, res) => {
    const { id_usuario, id_banda } = req.body;
    try {
        await prisma.seguidores.delete({
            where: {
                id_usuario_id_banda: {id_usuario, id_banda}
            },
        });

        res.json({ mensaje: "Seguidor eliminado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error eliminando seguidor" });
    }
};