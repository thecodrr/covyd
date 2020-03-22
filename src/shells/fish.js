const { openrc } = require("./utils");

const GREETING_FUNCTION = `function fish_greeting
    covyd
end`;
const PROMPT_FUNCTION = `function name --on-event fish_prompt
    covyd
end`;
const RC_PATH = ".config/fish/config.fish";

function setup(frequency) {
  return openrc(RC_PATH, function(data) {
    let command = "";
    if (frequency === -1) command = GREETING_FUNCTION;
    else command = PROMPT_FUNCTION;

    if (data.indexOf("covyd") > -1) return;
    return `${command}\n${data}`;
  });
}

function uninstall() {
  return openrc(RC_PATH, function(data) {
    return data.replace(GREETING_FUNCTION, "").replace(PROMPT_FUNCTION, "");
  });
}

module.exports = { setup, uninstall };
