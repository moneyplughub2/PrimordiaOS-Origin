export class ObjectRegistry {
  private objects = new Map<string, any>();

  register(id: string, data: any) {
    this.objects.set(id, data);
  }

  get(id: string) {
    return this.objects.get(id);
  }

  all() {
    return Array.from(this.objects.entries());
  }
}

export const Registry = new ObjectRegistry();
