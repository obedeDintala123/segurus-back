import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "src/prisma/client";

export async function createUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
    
  const {
    nome,
    telefone,
    estado,
    email,
    password,
    matriculaId
  } = request.body as any;

  if (!nome || !telefone || !email || !password) {
    return reply.status(400).send({ message: "Dados incompletos" });
  }

  const usuario = await prisma.usuario.create({
    data: {
      nome,
      telefone,
      estado,
      email,
      password,
      matriculaId
    }
  });

  if (!usuario) {
    return reply.status(500).send({ message: "Erro ao criar usuário" });
  }

  return reply.status(201).send(usuario);
}
