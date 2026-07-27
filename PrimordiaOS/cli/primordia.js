const route = require("./commands");

const cmd = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

route(cmd, arg1, arg2);
