import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://github.com/bvaughn/react-virtualized/issues/1212#issuecomment-847759202
const resolveFixup = {
  name: "resolve-fixup",
  setup(build) {
    build.onResolve({ filter: /react-virtualized/ }, async (args) => {
      return {
        path: path.resolve("./node_modules/react-virtualized/dist/umd/react-virtualized.js"),
      };
    });
  },
};

export default defineConfig({
  server: {
    fs: {
      // Allow serving files(index-react.tsx) from one level up to the project root
      allow: [".."],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [resolveFixup],
    },
  },
  plugins: [
    react({
      // Exclude storybook stories and test
      exclude: /\.(stories|test)\.(t|j)sx?$/,
      // Only .tsx files
      include: "src/**/*.tsx",
    }),
  ],
  build: {
    outDir: "build",
  },
});
