// Simple event subscription + dispatch system

export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(handler);
  }

  dispatch(event, payload) {
    const handlers = this.listeners.get(event);
    if (!handlers) return;

    for (const fn of handlers) {
      fn(payload);
    }
  }
}

export const Events = new EventBus();
