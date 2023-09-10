import { PrismaClient } from "@prisma/client";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

const prisma = new PrismaClient();

export const todoRouter = router({
  getAll: publicProcedure.query(async () => {
    const todos = await prisma.todo.findMany();
    return todos;
  }),

  create: protectedProcedure
    .input(
      z.object({
        task: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { task } = input;

      await prisma.todo.create({
        data: {
          task,
        },
      });
    }),

  delete: protectedProcedure.input(z.number()).mutation(async ({ input }) => {
    await prisma.todo.delete({
      where: {
        id: input,
      },
    });
  }),
});
