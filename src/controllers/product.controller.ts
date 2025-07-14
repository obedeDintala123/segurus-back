import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "src/prisma/client";
import { z } from "zod";
import { slugify } from "../utils/slugify"; // opcional
import { Prisma } from "@prisma/client";

export const getAllProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const products = await prisma.product.findMany();

  return reply.status(200).send(products);
};

export const getProductById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const paramsSchema = z.object({
    slugAndId: z.string()
  });

  const paramsParse = paramsSchema.safeParse(request.params);

  if (!paramsParse.success) {
    return reply.status(400).send({
      error: "Invalid product parameter",
      details: paramsParse.error.format()
    });
  }

  const { slugAndId } = paramsParse.data;

  // Tenta extrair o ID do formato slug-id ou apenas id
  let id: number | null = null;

  // Caso venha como "slug-123"
  const match = slugAndId.match(/-(\d+)$/);
  if (match) {
    id = parseInt(match[1]);
  }

  // Caso venha apenas o ID, como "123"
  if (!match && /^\d+$/.test(slugAndId)) {
    id = parseInt(slugAndId);
  }

  if (!id || isNaN(id) || id <= 0) {
    return reply.status(400).send({ error: "Invalid product ID" });
  }

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return reply.status(404).send({ error: "Product not found" });
  }

  return reply.status(200).send(product);
};

export const createProduct = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const bodySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    imageUrl: z.string().url(),
    category: z.string().min(1),
    price: z.string().or(z.number()),
    quantity: z.number().min(0)
  });

  const body = bodySchema.safeParse(request.body);

  if (!body.success) {
    return reply
      .status(400)
      .send({ error: "Invalid request data", details: body.error.format() });
  }

  const { name, description, imageUrl, category, price, quantity } = body.data;

  const product = await prisma.product.create({
    data: {
      name,
      slug: slugify(name),
      description,
      imageUrl,
      category,
      price: new Prisma.Decimal(price),
      quantity,
      inStock: quantity > 0
    }
  });

  return reply.status(201).send(product);
};
