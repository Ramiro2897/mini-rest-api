import { prisma } from "../lib/prisma";

export const getAllUsers = () => prisma.user.findMany();

export const getUserById = (id: number) =>
  prisma.user.findUnique({ where: { id } });

export const createUser = (data: { name: string; email: string }) =>
  prisma.user.create({ data });