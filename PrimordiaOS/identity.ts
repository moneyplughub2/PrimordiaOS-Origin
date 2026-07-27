import { CONFIG } from "./config";

export function assertPlatformIdentity(platform: string) {
    if (!platform) {
        throw new Error("[Identity] Missing platform identifier.");
    }
    return true;
}
