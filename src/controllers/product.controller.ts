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
