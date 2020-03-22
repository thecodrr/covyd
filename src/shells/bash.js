const fs = require("fs");
const { printError } = require("../helpers");

function setup(frequency) {
  return openrc(function(data) {
    let command = "";
    if (frequency === -1) command = "cassy";
    else command = "PROMPT_COMMAND=cassy";

    if (data.indexOf("cassy") > -1) return;
    return `${command}\n${data}`;
  });
}

function uninstall() {
  return openrc(function(data) {
    return data.replace("cassy", "").replace("PROMPT_COMMAND=cassy", "");
  });
}

function openrc(cb) {
  const bashrcPath = `${process.env.HOME}/.bashrc`;
  if (!fs.existsSync(bashrcPath))
    printError(`Couldn't find .bashrc file at: ${bashrcPath}`);

  return new Promise(function(resolve) {
    fs.readFile(bashrcPath, (err, data) => {
      if (err) printError(err);

      data = data.toString();
      data = cb(data);
      if (!data) return resolve();
      fs.writeFile(bashrcPath, data, function(err) {
        if (err) printError(err);
        resolve();
      });
    });
  });
}

module.exports = { setup, uninstall };
