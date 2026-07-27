import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 9090 });
wss.on('connection', (ws) => {
    console.log('Primordia WebSocket client connected');
    ws.on('message', (msg) => {
        console.log('WS → MCP:', msg.toString());
    });
    ws.send(JSON.stringify({ ok: true, source: 'PrimordiaWS' }));
});
console.log('Primordia WebSocket listening on :9090');
