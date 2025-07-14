import fastify from "fastify";
import dotenv from "dotenv";
import { productRoutes } from "./routes/product.routes";
import fastifyCors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

dotenv.config();

const server = fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifyCors, {
  origin: true
});

server.register(productRoutes);

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
