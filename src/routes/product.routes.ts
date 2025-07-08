import { FastifyInstance } from "fastify";
import { createProduct, getAllProducts } from "src/controllers/product.controller";

export const productRoutes = async (server: FastifyInstance) => {
    server.get("/products", getAllProducts);
    server.post("/products", createProduct);
}
