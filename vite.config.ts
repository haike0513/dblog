import { reactRouter } from "@react-router/dev/vite";
import deno from "@deno/vite-plugin"
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devServer from '@hono/vite-dev-server'


export default defineConfig(({ isSsrBuild }) => ({
  // build: {
  //   rollupOptions: isSsrBuild
  //     ? {
  //         input: "./server/app.ts",
  //       }
  //     : undefined,
  // },
  build: {
    target: "ESNEXT",
  },
  plugins: [deno(), tailwindcss(), reactRouter(), tsconfigPaths(),
    devServer({
      entry: 'server/app.tsx', // The file path of your application.
    }),

  ],
      ssr: {
      resolve: {
        conditions: ["module", "deno", "node", "development|production"],
        externalConditions: ["deno", "node"],
      },
    },
}));
