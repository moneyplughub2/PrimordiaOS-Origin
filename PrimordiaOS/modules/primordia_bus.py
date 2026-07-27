import requests
import json

CLOUD_BUS_URL = "https://<your-deta-url>"  # no trailing slash

def run(args):
    """
    Primordia Bus Command Router
    Usage:
      bus primordial send <channel> <payload>
      bus primordial broadcast <payload>
      bus primordial status
    """

    if len(args) < 2:
        return "[ERR] Primordia Bus: insufficient arguments"

    action = args[1]

    if action == "send":
        if len(args) < 4:
            return "[ERR] Usage: bus primordial send <channel> <payload>"

        channel = args[2]
        payload = args[3]

        try:
            r = requests.post(
                f"{CLOUD_BUS_URL}/send",
                json={"channel": channel, "payload": {"msg": payload}}
            )
            return f"[BUS] Sent → {channel}\n{json.dumps(r.json(), indent=2)}"
        except Exception as e:
            return f"[ERR] Cloud send failed: {e}"

    elif action == "broadcast":
        if len(args) < 3:
            return "[ERR] Usage: bus primordial broadcast <payload>"

        payload = args[2]

        try:
            r = requests.post(
                f"{CLOUD_BUS_URL}/broadcast",
                json={"payload": {"msg": payload}}
            )
            return f"[BUS] Broadcast\n{json.dumps(r.json(), indent=2)}"
        except Exception as e:
            return f"[ERR] Cloud broadcast failed: {e}"

    elif action == "status":
        try:
            r = requests.get(f"{CLOUD_BUS_URL}/status")
            return f"[BUS] Status\n{json.dumps(r.json(), indent=2)}"
        except Exception as e:
            return f"[ERR] Cloud status failed: {e}"

    else:
        return f"[ERR] Unknown bus action: {action}"
