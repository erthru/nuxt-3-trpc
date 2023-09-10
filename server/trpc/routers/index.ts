import { router } from "../trpc";
import { todoRouter } from "./todo";

export const appRouter = router({
  todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
