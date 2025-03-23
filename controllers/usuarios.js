import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un usuario
export const createUser = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    //Comprobar si existe el usuario
    const users = await prisma.usuarios.findMany({
        where: {
            nombre: nombre,
        }
    })
    if (users.length != 0) {
        res.status(500).json({error: "Usuario y/o correo ya existente"});
        return
    }

    try {
        const hashedpass = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = await prisma.usuarios.create({
            data: { nombre, correo, contrasena: hashedpass },
        });
        res.json(nuevoUsuario);
    } catch (error) {
        console.log(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error.code);
            res.status(500).json({})
        }
        res.status(500).json({ error: "Error creando usuario" });
    }
}

// Login
export const login = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const user = await prisma.usuarios.findUnique({ where: { correo: correo } });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        //console.log(user);
        // Comparar la contraseña
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { userId: user.id }, 
            process.env.AUTH_TOKEN_SECRET, 
            { expiresIn: process.env.AUTH_TOKEN_EXPIRATION }
        );

        res.status(200).json({ 
            id: user.id,
            nombre: user.nombre,
            correo: user.correo, 
            avatar: user.avatar,
            token,
            rol: user.rol,
        });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor', error });
  }
}

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
}

// Obtener un usuario por ID
export const getUserbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuarios.findUnique({ where: { id: parseInt(id) } });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo usuario" });
    }
}

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña } = req.body;
    try {
        const usuarioActualizado = await prisma.usuarios.update({
            where: { id: parseInt(id) },
            data: { nombre, correo, contraseña },
        });
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando usuario" });
    }
}

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.usuarios.delete({ where: { id: parseInt(id) } });
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando usuario" });
    }
}