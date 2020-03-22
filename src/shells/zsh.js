const { openrc } = require("./utils");

function setup(frequency) {
  return openrc(".zshrc", function(data) {
    let command = "";
    if (frequency === -1) command = "covyd";
    else command = "precmd() covyd";

    if (data.indexOf("covyd") > -1) return;
    return `${command}\n${data}`;
  });
}

function uninstall() {
  return openrc(".zshrc", function(data) {
    return data.replace("covyd", "").replace("precmd() covyd", "");
  });
}

module.exports = { setup, uninstall };
