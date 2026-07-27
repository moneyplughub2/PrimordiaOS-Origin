interface MemoryPacket {
  id: string
  type: string
  timestamp: number
  payload: any
}
function validateMemoryPacket(packet: any): boolean {
  if (!packet) return false
  if (typeof packet.id !== "string") return false
  if (typeof packet.type !== "string") return false
  if (typeof packet.timestamp !== "number") return false
  return true
}

export class MemoryEngine {
  private memory: MemoryPacket[] = []

  store(packet: MemoryPacket) {
    if (!validateMemoryPacket(packet)) {
      throw new Error("Invalid memory packet structure")
    }

    this.memory.push(packet)
  }

  recallById(id: string) {
    return this.memory.find(p => p.id === id)
  }

  recallByType(type: string) {
    return this.memory.filter(p => p.type === type)
  }
}

export const Memory = new MemoryEngine()
