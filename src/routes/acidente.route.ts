import { createAccindent } from "src/controllers/acidente.controller";
import { FastifyInstance } from "fastify";

export async function acidenteRoutes(fastify: FastifyInstance) {
    fastify.post("/acidente", createAccindent);
}
    