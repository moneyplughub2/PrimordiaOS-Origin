export class MemoryEngine {
    memory = {};
    store(key, value) {
        this.memory[key] = value;
    }
    recall(key) {
        return this.memory[key];
    }
}
export const Memory = new MemoryEngine();
