import { FastifyInstance } from "fastify";
import { createProduct, getAllProducts, getProductById } from "src/controllers/product.controller";

export const productRoutes = async (server: FastifyInstance) => {
    server.get("/products", getAllProducts);
    server.get("/products/:slugAndId", getProductById);
    server.post("/products", createProduct);
}
