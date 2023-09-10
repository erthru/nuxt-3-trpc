/** * This is your entry point to setup the root configuration for tRPC on the server. * - `initTRPC` should only be used once per app. * - We export only the functionality that we use so we can enforce which base procedures should be used * * Learn how to create protected base procedures and other things below: * @see https://trpc.io/docs/v10/router * @see https://trpc.io/docs/v10/procedures */
import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "~/server/trpc/context";

const t = initTRPC.context<Context>().create(); /** * Unprotected procedure **/

const isLoggedIn = t.middleware(async ({ next }) => {
  const status = 1;

  if (!status) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next();
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isLoggedIn);
export const router = t.router;
export const middleware = t.middleware;
