import { reactRouter } from "@react-router/dev/vite";
import deno from "@deno/vite-plugin"
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  // build: {
  //   rollupOptions: isSsrBuild
  //     ? {
  //         input: "./server/app.ts",
  //       }
  //     : undefined,
  // },
  plugins: [deno(), tailwindcss(), reactRouter(), tsconfigPaths()],
      ssr: {
      resolve: {
        conditions: ["module", "deno", "node", "development|production"],
        externalConditions: ["deno", "node"],
      },
    },
}));
