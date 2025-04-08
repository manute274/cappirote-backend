import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un devoto
export const createDevoto = async (req, res) => {
    const { id_usuario, id_hdad } = req.body;

    //Comprobar si existe el usuario y la hermandad
    const user = await prisma.usuarios.findUnique({where: {id: id_usuario,}})
    //console.log(parseInt(user.id));
    const hdad = await prisma.hermandades.findUnique({where: {id: id_hdad,}})
    if ((user == null) || (hdad == null)) {
        res.status(500).json({error: "Usuario o hermandad no existente"});
        return
    }

    //Si no existe la relacion la creo
    try {
        const nuevodevoto = await prisma.devotos.create({
            data: { id_usuario, id_hdad},
        });
        res.json(nuevodevoto);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando devoto" });
    }
}

// Obtener todos los devotos
export const getAllDevotos = async (req, res) => {
    const devotos = await prisma.devotos.findMany();
    res.json(devotos);
}

// Obtener las Hdades que sigue un Usuario
export const getDevotobyUserid = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const devoto = await prisma.devotos.findMany({ 
            where: { id_usuario: parseInt(id_usuario) },
            include: { hermandades: {select: { id: true, nombre: true, escudo: true }}}
        });
        if (devoto.length == 0) {
            return res.status(404).json({ message: "Usuario no sigue a ninguna hermandad" });
        }
        res.json(devoto);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo devoto" });
    }
}

//Obtener los Usuarios que siguen a una Hdad
export const getDevotobyHdadid = async (req, res) => {
    const { id_hdad } = req.params;
    try {
        const devoto = await prisma.devotos.findMany({ where: { id_hdad: parseInt(id_hdad) } });
        if (devoto.length == 0) {
            return res.status(404).json({ error: "Devoto no encontrado" });
        }
        res.json(devoto);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo devoto" });
    }
}

// Eliminar un devoto por ID
export const deleteDevoto = async (req, res) => {
    const { id_hdad, id_usuario } = req.params;
    try {
        const devotoEliminado = await prisma.devotos.delete({
            where: {
                id_hdad_id_usuario: {id_hdad, id_usuario}
            },
        });
        if (!devotoEliminado) {
            return res.status(404).json({ error: "Devoto no encontrado." });
        }

        res.json({ mensaje: "Devoto eliminado" });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Devoto no encontrado." });
        }
        res.status(500).json({ error: "Error interno del servidor al eliminar el devoto." });
    }
};

export const checkDevoto = async (req, res) => {
    const {id_hdad, id_usuario} = req.body
    try {
        if (!id_hdad || !id_usuario) {
            return res.status(400).json({ error: 'id_hdad y id_usuario son requeridos' });
        }
        const relacion = await prisma.devotos.findUnique({
            where: {
              id_hdad_id_usuario: {
                id_hdad: BigInt(id_hdad),
                id_usuario: BigInt(id_usuario),
              },
            },
        });

        if (relacion) {
            return res.json({ existe: true, mensaje: 'La relación existe.' });
        } else {
            return res.json({ existe: false, mensaje: 'La relación no existe.' });
        }
    } catch (error) {
        console.error('Error al verificar la relación:', error);
        return res.status(500).json({ error: 'Ocurrió un error al verificar la relación.' });
    }
}