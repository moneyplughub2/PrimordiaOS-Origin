import fs from "fs";
import { broadcast } from "../../core/bus/broadcast";
import { now } from "../../core/utils/time";
export function watchPath(path) {
    if (!fs.existsSync(path)) {
        broadcast({
            type: "FS_Error",
            payload: { path, error: "Missing", timestamp: now() }
        });
        return;
    }
    fs.watch(path, (event, filename) => {
        if (!fs.existsSync(`${path}/${filename}`)) {
            broadcast({
                type: "FS_Error",
                payload: { path: filename, error: "Missing", timestamp: now() }
            });
        }
    });
}
