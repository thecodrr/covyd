const { openrc } = require("./utils");

function setup(frequency) {
  return openrc(".zshrc", function(data) {
    let command = "";
    if (frequency === -1) command = "cassy";
    else command = "precmd() cassy";

    if (data.indexOf("cassy") > -1) return;
    return `${command}\n${data}`;
  });
}

function uninstall() {
  return openrc(".zshrc", function(data) {
    return data.replace("cassy", "").replace("precmd() cassy", "");
  });
}

module.exports = { setup, uninstall };
