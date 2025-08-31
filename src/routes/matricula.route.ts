import { FastifyInstance } from "fastify";
import { createMatricula } from "src/controllers/matricula.controller";

export async function matriculaRoutes(fastify: FastifyInstance) {
  fastify.post("/matricula", createMatricula);
}