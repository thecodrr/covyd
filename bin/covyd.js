#!/usr/bin/env node

const { init, uninstallCovyd, stat, printMessage } = require("../src");
const { loadMessages } = require("../src/messages");

async function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    await printMessage();
  } else {
    const arg = args[0];
    switch (arg) {
      case "init":
        return init();
      case "stat":
        return stat();
      case "refresh":
        await loadMessages();
        break;
      case "uninstall":
        return uninstallCovyd();
    }
  }
}

(async function() {
  await main();
})();
