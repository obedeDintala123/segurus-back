import fastify from "fastify";
import dotenv from "dotenv";
import fastifyCors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { acidenteRoutes } from "./routes/acidente.route";
import { userRoutes } from "./routes/usuario.route";
import { matriculaRoutes } from "./routes/matricula.route";

dotenv.config();

const server = fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifyCors, {
  origin: true
});

server.register(acidenteRoutes);
server.register(userRoutes);
server.register(matriculaRoutes);

server.get("/", async () => {
  return { status: "API rodando com Fastify + TypeScript!" };
});

server.listen({ port: 3333, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Servidor rodando em ${address}`);
});
