let socket: WebSocket | null = null;
const listeners = new Set<(msg: any) => void>();

export function connectEngineWS(url = "ws://localhost:8010") {
  if (socket) return;
  socket = new WebSocket(url);
  socket.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      for (const fn of listeners) fn(data);
    } catch (e) {
      console.error("WS parse error", e);
    }
  };
}

export function onEngineEvent(fn: (msg: any) => void) {
  listeners.add(fn);
}

export function offEngineEvent(fn: (msg: any) => void) {
  listeners.delete(fn);
}
