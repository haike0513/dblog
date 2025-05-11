import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome.tsx";
import { db } from "../../server/db/db.ts";
import { users } from "../../server/db/schema.ts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context }: Route.LoaderArgs) {
  const rs = await db.select().from(users);
  console.log(rs);
  return { message: context.VALUE_FROM_EXPRESS, list: rs };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={loaderData.message} list={loaderData.list} />;
}
