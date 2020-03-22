const { openrc } = require("./utils");

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
  return openrc(".bashrc", function(data) {
    return data.replace("cassy", "").replace("PROMPT_COMMAND=cassy", "");
  });
}

module.exports = { setup, uninstall };
