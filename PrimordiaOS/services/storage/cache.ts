export class PrimordiaCache {
  private cache = new Map<string, any>();

  set(key: string, value: any) {
    this.cache.set(key, value);
  }

  get(key: string) {
    return this.cache.get(key);
  }

  clear() {
    this.cache.clear();
  }
}

export const Cache = new PrimordiaCache();
