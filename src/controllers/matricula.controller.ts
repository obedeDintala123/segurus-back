import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "src/prisma/client";

export async function createMatricula(
  request: FastifyRequest,
  reply: FastifyReply
) {
  //     model Matricula {
  //   id        Int        @id @default(autoincrement())
  //   valor     String     @unique
  //   usuario   Usuario? // Relacionamento reverso, não precisa de fields/references aqui
  //   acidentes  Acidente[]
  //   deletedAt   DateTime?
  //   createdAt DateTime @default(now())
  //   updatedAt DateTime @updatedAt
  // }

  const { valor } = request.body as any;

  if (!valor) {
    return reply.status(400).send({ message: "Dados incompletos" });
  }
  const matricula = await prisma.matricula.create({
    data: {
      valor: String(valor)
    }
  });

  if (!matricula) {
    return reply.status(500).send({ message: "Erro ao criar matrícula" });
  }

  return reply.status(201).send(matricula);
}
