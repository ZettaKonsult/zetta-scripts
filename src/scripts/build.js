const path = require("path");
const spawn = require("cross-spawn");
const rimraf = require("rimraf");
const { hasPkgProp, fromRoot, resolveBin, hasFile } = require("../utils");

const argv = process.argv.slice(2);
const here = p => path.join(__dirname, p);

const useBuiltinConfig =
  !argv.includes("--presets") && !hasFile(".babelrc") && !hasPkgProp("babel");
const config = useBuiltinConfig
  ? ["--presets", here("../config/babelrc.js")]
  : [];

const ignore = argv.includes("--ignore")
  ? []
  : ["--ignore", "__tests__,__mocks__,*.spec.js"];

const copyFiles = argv.includes("--no-copy-files") ? [] : ["--copy-files"];

const useSpecifiedOutDir = argv.includes("--out-dir");
const outDir = useSpecifiedOutDir ? [] : ["--out-dir", "dist"];

if (!useSpecifiedOutDir && !argv.includes("--no-clean")) {
  rimraf.sync(fromRoot("dist"));
}

const result = spawn.sync(
  resolveBin("babel-cli", { executable: "babel" }),
  [...outDir, ...copyFiles, ...ignore, ...config, "src"],
  { stdio: "inherit" }
);

process.exit(result.status);
