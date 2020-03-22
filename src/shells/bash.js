const { openrc } = require("./utils");

function setup(frequency) {
  return openrc(function(data) {
    let command = "";
    if (frequency === -1) command = "covyd";
    else command = "PROMPT_COMMAND=covyd";

    if (data.indexOf("covyd") > -1) return;
    return `${command}\n${data}`;
  });
}

function uninstall() {
  return openrc(".bashrc", function(data) {
    return data.replace("covyd", "").replace("PROMPT_COMMAND=covyd", "");
  });
}

module.exports = { setup, uninstall };
