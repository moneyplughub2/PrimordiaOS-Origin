export class ObjectRegistry {
    objects = new Map();
    register(id, data) {
        this.objects.set(id, data);
    }
    get(id) {
        return this.objects.get(id);
    }
    all() {
        return Array.from(this.objects.entries());
    }
}
export const Registry = new ObjectRegistry();
