const bash = require("./bash.js");
const zsh = require("./zsh.js");
const fish = require("./fish.js");
const ConfigStore = require("configstore");
const { printError, printAssistError } = require("../helpers");

const config = new ConfigStore("covyd", {
  frequency: -1,
  count: 0,
  shells: []
});

const SHELLS = [
  {
    name: "Bash",
    aliases: ["bash"],
    setup: bash.setup,
    uninstall: bash.uninstall
  },
  {
    name: "Zsh",
    aliases: ["zsh"],
    setup: zsh.setup,
    uninstall: zsh.uninstall
  },
  {
    name: "Fish",
    aliases: ["fish"],
    setup: fish.setup,
    uninstall: fish.uninstall
  }
];

function setup(shellName, frequency) {
  const shell = getShell(shellName);
  config.set("frequency", frequency);
  const shells = config.get("shells");
  if (shells.indexOf(shell.name) <= -1)
    config.set("shells", [...shells, shell.name]);
  return shell.setup(frequency);
}

async function uninstall() {
  let shells = config.get("shells");
  if (!shells.length) printError("You have not installed covyd yet.");
  //shells = shells.map(sh => SHELLS.find(s => sh === s.name));
  await Promise.all(
    shells.map(async sh => {
      const shell = SHELLS.find(s => sh === s.name);
      if (!shell) return Promise.resolve();
      return shell.uninstall();
    })
  );
  config.clear();
}

function getShell(shellName) {
  if (!shellName.trim()) {
    printError("ERROR! Invalid input. Please do not provide empty shell name.");
  }
  const shell = SHELLS.find(sh =>
    sh.aliases.some(alias => shellName === alias)
  );
  if (!shell) {
    const supportedShells = SHELLS.map(sh => sh.name).join("\n");
    printAssistError(
      `ERROR! This shell is not supported. Supported shells are:\n${supportedShells}`
    );
  }
  return shell;
}

module.exports = { uninstall, setup };
