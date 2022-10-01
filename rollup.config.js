import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import html from "@rollup/plugin-html";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

const mainBuildConfig = {
  input: "src/index.tsx",
  output: [
    {
      file: "dist-rollup/bundle.js",
      name: "app",
      sourcemap: false,
      format: "iife",
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    json(),
    resolve({
      browser: true,
      dedupe: ["react", "react-dom"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
    commonjs(),
    image(),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    postcss({
      extensions: [".css", ".scss"],
      minimize: true,
      extract: false,
      use: ["sass"],
    }),
    terser(),
    /**[OPTIONAL] Copy utility.*/
    copy({
      targets: [
        {
          src: ["public/**/*", "!**/*.html"],
          dest: "dist-rollup",
        },
      ],
      flatten: true,
    }),
    /**[OPTIONAL] Create a html file to check the bundle.*/
    html({
      title: "React App",
      fileName: "index.html",
      publicPath: "./",
      attributes: { script: { async: true } },
      externals: [{ type: "js", file: "bundle.js", pos: "before" }],
    }),
  ],
};

export default mainBuildConfig;
