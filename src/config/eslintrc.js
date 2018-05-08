const { ifAnyDep } = require("../utils");

module.exports = {
  extends: [
    require.resolve("eslint-config-prettier"),
    require.resolve("eslint-config-react-app")
  ].filter(Boolean),

  rules: {}
};
