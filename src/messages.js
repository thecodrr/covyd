const rgb = require("./rgb");
const ConfigStore = require("configstore");
const fetch = require("node-fetch");
const config = new ConfigStore("covyd", {
  messages: [],
  lastSynced: undefined
});

const messages = [];
const URL =
  "https://raw.githubusercontent.com/thecodrr/covyd/master/data/messages.txt";

async function syncMessages() {
  if (!shouldSync()) return;
  const result = await fetch(URL);
  if (result.ok) {
    const text = await result.text();
    messages.push(...text.split("\n"));
    config.set("lastSynced", Date.now());
    config.set("messages", messages);
  }
}

function shouldSync() {
  const lastSynced = config.get("lastSynced");
  if (lastSynced) {
    var oneDayMore = new Date(lastSynced);
    oneDayMore = tomorrow.setDate(tomorrow.getDate() + 1);
    return oneDayMore > Date.now();
  }
  return true;
}

async function loadMessages() {
  messages.length = 0;
  messages.push(...config.get("messages"));
  await syncMessages();
}

function getRandomMessage() {
  let message = messages[Math.floor(Math.random() * messages.length)];
  if (Math.random() * 100 > 90)
    message += rgb.it(
      "\nYou can contribute your own personal messages, tips, jokes or stories by going to https://github.com/thecodrr/covyd"
    );
  return message || "";
}

module.exports = { loadMessages, getRandomMessage };
