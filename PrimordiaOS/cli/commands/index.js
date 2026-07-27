const bus = require("./bus");

module.exports = function route(cmd, arg1, arg2) {
  if (!cmd) return console.log("[ERR] No command provided");

  switch (cmd) {
    case "bus":
      return bus(arg1, arg2);
    default:
      console.log(`[ERR] Unknown command: ${cmd}`);
  }
};
