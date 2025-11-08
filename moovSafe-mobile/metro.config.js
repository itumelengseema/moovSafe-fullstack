const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Fix for monorepo - explicitly set project root and disable parent directory watching
config.projectRoot = __dirname;
config.watchFolders = [__dirname];

// Prevent Metro from trying to resolve or watch parent directories
config.resolver.blockList = [
  // Block the parent node_modules that doesn't exist
  new RegExp(path.resolve(__dirname, "..", "node_modules") + "/.*"),
  // Block any parent directory traversal
  /.*\/\.\.\/node_modules\/.*/,
];

// Force Metro to only look in this project's node_modules
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

module.exports = withNativeWind(config, { input: "./global.css" });
