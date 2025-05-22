import { reactRouter } from "@react-router/dev/vite";
import deno from "@deno/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devServer from "@hono/vite-dev-server";
import react from "@vitejs/plugin-react-swc";
import nodeAdapter from "@hono/vite-dev-server/bun";
import path from "node:path";

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
  server: {
    watch: {},
  },
  plugins: [
    react(),
    deno(),
    // devServer({
    //   entry: "server/app.tsx", // The file path of your application.
    //   adapter: nodeAdapter(),
    //   exclude: [
    //     // /.*\.css$/,  this file will be exclude
    //     // '/assets/*',
    //     /.*\.ts$/,
    //     /.*\.tsx$/,
    //     /^\/@.+$/,
    //     /\?t\=\d+$/,
    //     /^\/favicon\.ico$/,
    //     /^\/static\/.+/,
    //     /^\/node_modules\/.*/,
    //   ],
    // }),
    tailwindcss(),
    // reactRouter(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  // ssr: {
  //   resolve: {
  //     conditions: ["module", "deno", "node", "development|production"],
  //     externalConditions: ["deno", "node"],
  //   },
  // },
}));
