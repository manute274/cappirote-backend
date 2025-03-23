import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un contrato
export const createContrato = async (req, res) => {
    const { id_hdad, id_banda } = req.body;

    //Comprobar si existe el contrato
    const hdad = await prisma.hermandades.findUnique({where: {id: id_hdad,}})
    const banda = await prisma.bandas.findUnique({where: {id: id_banda,}})
    if ((hdad == null) || (banda == null)) {
        res.status(500).json({error: "Usuario o banda no existente"});
        return
    }

    //Si no existe lo creo
    try {
        const nuevocontrato = await prisma.contratos.create({
            data: { id_hdad, id_banda},
        });
        res.json(nuevocontrato);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando contrato" });
    }
}

// Obtener todos los contratos
export const getAllContratos = async (req, res) => {
    const contratos = await prisma.contratos.findMany();
    res.json(contratos);
}

// Obtener las Bandas que sigue un Usuario
export const getContratobyHdadid = async (req, res) => {
    const { id_hdad } = req.params;
    try {
        const contrato = await prisma.contratos.findMany({ where: { id_hdad: parseInt(id_hdad) } });
        if (contrato.length == 0) {
            return res.status(404).json({ error: "Contrato no encontrado" });
        }
        res.json(contrato);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo contrato" });
    }
}

//Obtener los Contratos de una Banda
export const getContratobyBandaid = async (req, res) => {
    const { id_banda } = req.params;
    try {
        const contrato = await prisma.contratos.findMany({ where: { id_banda: parseInt(id_banda) } });
        if (contrato.length == 0) {
            return res.status(404).json({ error: "Contrato no encontrado" });
        }
        res.json(contrato);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo contrato" });
    }
}

// Eliminar un contrato por ID
export const deleteContrato = async (req, res) => {
    const { id_hdad, id_banda } = req.body;
    try {
        await prisma.contratos.delete({
            where: {
                id_hdad_id_banda: {id_hdad, id_banda}
            },
        });

        res.json({ mensaje: "Contrato eliminado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error eliminando contrato" });
    }
};