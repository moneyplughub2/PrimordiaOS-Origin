import { broadcast } from "../../core/bus/broadcast";

export function updatePluginCapability(plugin: string, enabled: boolean) {
  broadcast({
    type: "Unreal_PluginCapability",
    payload: { plugin, enabled }
  });
}
