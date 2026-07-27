import { Hono } from 'hono';

const app = new Hono();

// Root route — confirms Worker is running
app.get('/', (c) => {
    return c.text('PrimordiaOS Worker is running');
});

// Status route — simple telemetry
app.get('/status', (c) => {
    return c.json({
        system: 'PrimordiaOS',
        worker: 'primordiaos-prod',
        status: 'online',
        timestamp: new Date().toISOString()
    });
});

export default app;
