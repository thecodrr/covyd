let styles = {
  error: 31,
  success: 32,
  warn: 33,
  info: 36,
  //other: 37,
  bold: 1,
  dim: 2,
  bg: 7,
  it: 3
};

for (let style in styles) {
  let color = styles[style];
  module.exports[style] = function(str) {
    return colorize(str, color);
  };
  if (color < 30) {
    for (let childStyle in styles) {
      let childColor = styles[childStyle];
      if (childColor < 30) continue;
      let name = childStyle + style[0].toUpperCase() + style.substring(1);
      module.exports[name] = function(str) {
        return colorize(str, `${color};${childColor}`);
      };
    }
  }
}

function colorize(str, color) {
  return `\u001b[${color}m${str}\u001b[0m`;
}
