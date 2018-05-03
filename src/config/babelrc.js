const isTest = (process.env.BABEL_ENV || process.env.NODE_ENV) === "test";

const envTargets = isTest ? { node: "current" } : { node: "4.5" };
// const envOptions = { modules: false, loose: true, targets: envTargets };

module.exports = {
  presets: [require.resolve("babel-preset-env")]
};
