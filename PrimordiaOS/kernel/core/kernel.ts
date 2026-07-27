export class PrimordiaKernel {
  modules: Record<string, any> = {};
  events: Record<string, Function[]> = {};
  ready: boolean = false;

  init() {
    this.ready = true;
    console.log("[PrimordiaOS] Kernel initialized");
  }

  register(name: string, module: any) {
    this.modules[name] = module;
    console.log(`[PrimordiaOS] Module registered: ${name}`);
  }

  on(event: string, handler: Function) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(handler);
  }

  emit(event: string, payload: any) {
    const listeners = this.events[event] || [];
    for (const fn of listeners) fn(payload);
  }

  handleIntent(intent: any) {
    const { agent, action, payload } = intent;

    if (!this.modules[agent]) {
      return { ok: false, msg: `Unknown agent: ${agent}` };
    }

    const module = this.modules[agent];

    if (typeof module[action] !== "function") {
      return { ok: false, msg: `Unknown action: ${action}` };
    }

    try {
      const result = module[action](payload);
      return { ok: true, result };
    } catch (err) {
      return { ok: false, msg: String(err) };
    }
  }
}

export const Kernel = new PrimordiaKernel();
