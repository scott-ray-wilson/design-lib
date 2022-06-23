import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript2 from "rollup-plugin-typescript2";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      // {
      //   dir: "dist/cjs",
      //   // file: packageJson.main,
      //   format: "cjs",
      //   sourcemap: true,
      //   name: "react-lib",
      // },
      {
        dir: "dist",
        // file: packageJson.module,
        format: "esm",
        sourcemap: true,
        // preserveModules: true, // Important if we want to code split
      },
    ],
    preserveModules: true, // Important if we want to code split
    plugins: [
      external(),
      resolve(),
      commonjs(),
      // babel({
      //   plugins: [
      //     // comes from https://material-ui.com/guides/minimizing-bundle-size/#option-2
      //     [
      //       "babel-plugin-import",
      //       {
      //         libraryName: "@material-ui/core",
      //         libraryDirectory: "esm",
      //         camel2DashComponentName: false,
      //       },
      //       "core",
      //     ],
      //     [
      //       "babel-plugin-import",
      //       {
      //         libraryName: "@material-ui/icons",
      //         libraryDirectory: "esm",
      //         camel2DashComponentName: false,
      //       },
      //       "icons",
      //     ],
      //   ],
      //   exclude: "node_modules/**",
      //   // runtimeHelpers: true,
      //   babelHelpers: "runtime",
      // }),
      // typescript({ tsconfig: "./tsconfig.json" }),
      typescript2({ useTsconfigDeclarationDir: true }),
      // terser(),
    ],
    watch: {
      chokidar: {
        useFsEvents: false,
      },
    },
  },
  {
    input: "types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
    watch: {
      chokidar: {
        useFsEvents: false,
      },
    },
  },
];
