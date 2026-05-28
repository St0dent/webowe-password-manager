const fs = require("fs");

function readFile(file) {
  return JSON.parse(fs.readFileSync(file));
}

function writeFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { readFile, writeFile };