export class MemoryEngine {
  private memory: Record<string, any> = {};

  store(key: string, value: any) {
    this.memory[key] = value;
  }

  recall(key: string) {
    return this.memory[key];
  }
}

export const Memory = new MemoryEngine();
