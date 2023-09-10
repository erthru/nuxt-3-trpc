import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const appRouter = router({
  db: publicProcedure
    .input(
      z.object({
        model: z.string(),
        fn: z.string(),
        args: z.unknown(),
      })
    )
    .query(async ({ input }) => {
      const { model, fn, args } = input;
      await prisma.$connect();

      const result = await (prisma[model as keyof typeof prisma] as any)[fn](
        args
      );

      await prisma.$disconnect();
      return result;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
