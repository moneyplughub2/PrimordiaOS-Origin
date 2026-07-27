import { onEngineEvent, connectEngineWS } from "./ws-client";
export async function initOverlay(canvas) {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter)
        return;
    const device = await adapter.requestDevice();
    const context = canvas.getContext("webgpu");
    const format = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device,
        format,
        alphaMode: "premultiplied",
    });
    // TODO: load shaders, create pipelines
    // For now, just react to events
    connectEngineWS();
    onEngineEvent((event) => {
        // event.type, event.payload
        // Use this to drive overlay visuals
        console.log("Overlay event:", event);
    });
}
