import { FastifyInstance } from "fastify";
import { createUser } from "src/controllers/usuario.controller";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/usuario", createUser);
}