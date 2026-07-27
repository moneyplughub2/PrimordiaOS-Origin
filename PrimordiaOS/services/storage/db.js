export class PrimordiaDB {
    store = {};
    set(key, value) {
        this.store[key] = value;
    }
    get(key) {
        return this.store[key];
    }
    all() {
        return this.store;
    }
}
export const DB = new PrimordiaDB();
