import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import ts2gas from "ts2gas";

const extensions = [".ts", ".js"];

const preventTreeShakingPlugin = () => {
  return {
    name: "no-treeshaking",
    resolveId(id, importer) {
      if (!importer) {
        // let's not theeshake entry points, as we're not exporting anything in Apps Script files
        return { id, moduleSideEffects: "no-treeshake" };
      }
      return null;
    },
  };
};

const ts2gasTranfromerPlugin = () => {
  return {
    name: "ts2gas-transformer",
    transform(code) {
      const generatedCode = ts2gas(code);

      return {
        code: generatedCode,
        map: { mappings: "" },
      };
    },
  };
};

export default {
  input: "./src/app.ts",
  output: {
    dir: "build",
    format: "esm",
  },
  plugins: [
    preventTreeShakingPlugin(),
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: "runtime",
      presets: ["@babel/preset-typescript"],
      plugins: ["@babel/plugin-transform-runtime"],
    }),
    uglify(),
    // ts2gasTranfromerPlugin(),
  ]
};
