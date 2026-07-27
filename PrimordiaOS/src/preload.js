// Preload script: expose a minimal safe API to renderer
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('primordia', {
  getBaseUrl: () => process.env.PRIMORDIA_BASE_URL || 'https://primordiaos-prod.cashplughub.workers.dev'
});
