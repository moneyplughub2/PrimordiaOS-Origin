export class PrimordiaDB {
  private store: Record<string, any> = {};

  set(key: string, value: any) {
    this.store[key] = value;
  }

  get(key: string) {
    return this.store[key];
  }

  all() {
    return this.store;
  }
}

export const DB = new PrimordiaDB();
