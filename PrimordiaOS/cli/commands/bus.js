const fetch = require("node-fetch");

const CLOUD_BUS_URL = "https://primordialorigin.com

module.exports = async function bus(action, arg) {
  if (!action) {
    console.log("[ERR] Usage: primordia bus <action>");
    return;
  }

  if (action === "primordial") {
    console.log("[BUS] Primordial mode active");
    return;
  }

  if (action === "send") {
    const [channel, payload] = arg.split(" ");
    const res = await fetch(`${CLOUD_BUS_URL}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel, payload: { msg: payload } })
    });
    const data = await res.json();
    console.log("[BUS] Sent →", channel);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (action === "broadcast") {
    const res = await fetch(`${CLOUD_BUS_URL}/broadcast`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: { msg: arg } })
    });
    const data = await res.json();
    console.log("[BUS] Broadcast");
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (action === "status") {
    const res = await fetch(`${CLOUD_BUS_URL}/status`);
    const data = await res.json();
    console.log("[BUS] Status");
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(`[ERR] Unknown bus action: ${action}`);
};
