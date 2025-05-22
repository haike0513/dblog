import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome.tsx";
import { db } from "../../server/db/db.ts";
import { users } from "../../server/db/schema.ts";
import { createMiddleware } from "hono/factory";
import { AppVariables } from "../../server/app.tsx";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const handler = createMiddleware<{ Variables: AppVariables } >(async (ctx,) => {
  const rs = await ctx.var.db.select().from(users);
  // await next();
  return rs;
})

export async function loader({ context }: Route.LoaderArgs) {
  const rs = await db.select().from(users);
  console.log(rs);
  return { message: context.VALUE_FROM_EXPRESS, list: rs };
}

export default function Home({ loaderData, data }: Route.ComponentProps) {
  return <Welcome message={loaderData?.message} list={data} />;
}
