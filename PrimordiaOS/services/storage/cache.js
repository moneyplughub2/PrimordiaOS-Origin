export class PrimordiaCache {
    cache = new Map();
    set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        return this.cache.get(key);
    }
    clear() {
        this.cache.clear();
    }
}
export const Cache = new PrimordiaCache();
