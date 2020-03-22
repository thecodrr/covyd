const fs = require("fs");
const { printError } = require("../helpers");

function openrc(rcFilename, cb) {
  const rcPath = `${process.env.HOME}/${rcFilename}`;
  if (!fs.existsSync(rcPath))
    printError(`Couldn't find ${rcFilename} file at: ${rcPath}`);

  return new Promise(function(resolve) {
    fs.readFile(rcPath, (err, data) => {
      if (err) printError(err);

      data = data.toString();
      data = cb(data);
      if (!data) return resolve();
      fs.writeFile(rcPath, data, function(err) {
        if (err) printError(err);
        resolve();
      });
    });
  });
}

module.exports = { openrc };
