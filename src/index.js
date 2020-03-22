const { getRandomMessage, loadMessages } = require("./messages");
const readline = require("readline");
const { setup, uninstall } = require("./shells");
const ConfigStore = require("configstore");
const { printThanks, printError } = require("./helpers");
const rgb = require("./rgb");

const config = new ConfigStore("covyd", { count: 0 });

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
      case "uninstall":
        return uninstallCovyd();
    }
  }
}

async function printMessage() {
  const frequency = config.get("frequency");
  let count = config.get("count");
  config.set("count", ++count);
  if (frequency === -1 || count % frequency === 0) {
    await loadMessages();
    console.log(getRandomMessage());
  }
}

function stat() {
  let count = config.get("count");
  console.log(`You have executed ${count} commands.`);
  printThanks();
}

function init() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(
    rgb.infoBold("🖥️  What shell do you use (e.g. bash, zsh etc.)? "),
    function(shell) {
      console.log();
      rl.question(
        rgb.infoBold("🕐 How frequently do you want to be assisted?") +
          rgb.it(
            "\n(-1 = once on open, 0 = after every command, >0 = after N commands): "
          ),
        async function(frequency) {
          const n = parseInt(frequency);
          if (isNaN(n)) printError("Invalid input. Please provide a number.");
          await setup(shell, n);
          await loadMessages();
          rl.close();
        }
      );
    }
  );

  rl.on("close", function() {
    printThanks();
    process.exit(0);
  });
}

function uninstallCovyd() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(
    rgb.warnBold("🗑️  Are you sure you want to uninstall covyd? (Y/n): "),
    async function(answer) {
      if (answer === "Y") await uninstall();
      else printThanks();
      rl.close();
    }
  );
}

(async function() {
  await main();
})();
