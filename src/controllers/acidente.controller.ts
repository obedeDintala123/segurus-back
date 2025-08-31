import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "src/prisma/client";

export async function createAccindent(request: FastifyRequest, reply: FastifyReply) {

  const {
    ativados,
    descricao,
    latitude,
    longitude,
    matriculaId,
    status_acidente,
    velocidade,
    hora,
    data
  } = request.body as any;

  if (
    !ativados ||
    !descricao ||
    !latitude ||
    !longitude ||
    !matriculaId ||
    !status_acidente ||
    !velocidade ||
    !hora ||
    !data
  ) {
    return reply.status(400).send({ message: "Dados incompletos" });
  }

  const acidente = await prisma.acidente.create({
    data: {
      ativados,
      descricao,
      latitude,
      longitude,
      matriculaId,
      status_acidente,
      velocidade,
      hora,
      data
    }
  });

  if (!acidente) {
    return reply.status(500).send({ message: "Erro ao criar acidente" });
  }

  return reply.status(201).send(acidente);
}
