import { broadcast } from "../../core/bus/broadcast";
export function updatePluginCapability(plugin, enabled) {
    broadcast({
        type: "Unreal_PluginCapability",
        payload: { plugin, enabled }
    });
}
