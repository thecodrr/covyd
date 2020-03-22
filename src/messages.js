const rgb = require("./rgb");

const messages = [
  "👏 Don't forget to regularly wash your hands.",
  "🏠 Stay home. Stay safe.",
  "🦺 Keep yourself socially distant. Help straighten the curve.",
  "🥶 Don't touch your face.",
  "😷 Wearing a mask helps a lot.",
  "🤧 Always sneeze in your elbow."
];

function getRandomMessage() {
  let message = messages[Math.floor(Math.random() * messages.length)];
  if (Math.random() * 100 > 90)
    message += rgb.it(
      "\nYou can contribute your own personal messages, tips, jokes or stories by going to https://github.com/thecodrr/covyd"
    );
  return message;
}

module.exports = getRandomMessage;
