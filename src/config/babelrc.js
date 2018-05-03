const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isTest = env === "test";
const isProduction = env === "production";

const envTargets = isTest ? { node: "current" } : { node: "4.5" };
const envOptions = { modules: false, loose: false, targets: envTargets };

module.exports = {
  presets: [
    [
      require("babel-preset-env").default,
      {
        targets: envTargets
      }
    ],
    require.resolve("babel-preset-flow"),
    isProduction && require("babel-preset-minify")
  ]
};
