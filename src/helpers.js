const rgb = require("./rgb");

function printThanks() {
  console.log();
  console.log(rgb.bold("Thank you for using Cassy."));
  console.log(rgb.info("Support me: https://ko-fi.com/thecodrr"));
  console.log(
    rgb.info(
      "If you have an idea, please head over to GitHub: https://github.com/thecodrr/cassy"
    )
  );
  console.log(rgb.it("Stay home and stay safe,"));
  console.log(rgb.it("thecodrr`"));
}

function printError(err, hint) {
  console.error();
  console.error(
    rgb.error("ERROR! ") + rgb.bold(!err.message ? err : err.message)
  );
  console.error(
    hint ||
      rgb.info(
        "If you think this is an error, please open an issue over at: https://github.com/thecodrr/cassy/issues"
      )
  );
  process.exit(err.code || -1);
}

function printAssistError(err) {
  printError(
    err,
    rgb.info(
      "If you'd like to help me add support for this feature,\njust open a PR over at: https://github.com/thecodrr/cassy/pulls"
    )
  );
}

function printWarning(message) {
  console.log(rgb.warnBold(message));
}

module.exports = {
  printThanks,
  printError,
  printAssistError,
  printWarning
};
