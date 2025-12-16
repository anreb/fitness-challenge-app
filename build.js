const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/main.jsx"],
    bundle: true,
    minify: true,
    outfile: "dist/bundle.js",
    jsx: "automatic",
    target: "es2018",
  })
  .catch(() => process.exit(1));
