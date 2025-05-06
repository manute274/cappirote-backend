import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un evento
export const createEvents = async (req, res) => {
    const { nombre, descripcion, fecha, id_usuario } = req.body;
    
    try {
      const evento = await prisma.eventos.create({
        data: {
          nombre,
          descripcion,
          fecha: new Date(fecha),
          id_usuario,
        },
      });
      res.status(201).json(evento);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el evento" });
    }
}

// Obtener todos los eventos
export const getAllEvents = async (req, res) => {
    try {
        const eventos = await prisma.eventos.findMany({include: {usuarios: {select: {nombre:true}}}});
        const eventosConUsername = eventos.map(evento => ({
          id: evento.id,
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          fecha: evento.fecha,
          nombre_usuario: evento.usuarios?.nombre,
        }));

        res.status(200).json(eventosConUsername);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los eventos" });
    }
}

// Obtener un evento por su ID
export const getEventsbyId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const evento = await prisma.eventos.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (evento) {
        res.status(200).json(evento);
      } else {
        res.status(404).json({ error: "Evento no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el evento" });
    }
}
  
// Actualizar un evento
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha, id_usuario } = req.body;
  
    try {
      const evento = await prisma.eventos.update({
        where: { id: parseInt(id) },
        data: {
          nombre,
          descripcion,
          fecha,
          id_usuario,
        },
      });
      res.status(200).json(evento);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el evento" });
    }
}
  
// Eliminar un evento
export const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.eventos.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Evento eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el evento" });
    }
}