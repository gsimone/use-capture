const {
  babelInclude,
  addWebpackAlias,
  removeModuleScopePlugin,
  addWebpackModuleRule,
  override,
} = require("customize-cra");
const { addReactRefresh } = require("customize-cra-react-refresh");
const path = require("path");

module.exports = (config, env) => {
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".tsx"];
  return override(
    addReactRefresh(),
    removeModuleScopePlugin(),
    addWebpackAlias({
      "react-three-fiber": path.resolve("node_modules/react-three-fiber"),
      react: path.resolve("node_modules/react"),
      "react-dom": path.resolve("node_modules/react-dom"),
      "use-capture": "../../",
    }),
    addWebpackModuleRule({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    })
  )(config, env);
};
