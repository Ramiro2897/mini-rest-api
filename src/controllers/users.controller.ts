import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET /users
export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// GET /users/:id
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid user id" });

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// POST /users
export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "Name and email are required" });

  const user = await prisma.user.create({ data: { name, email } });
  res.status(201).json(user);
};

// PUT /users/:id
export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  if (isNaN(id)) return res.status(400).json({ message: "Invalid user id" });

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.json(user);
  } catch {
    res.status(404).json({ message: "User not found" });
  }
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid user id" });

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(404).json({ message: "User not found" });
  }
};