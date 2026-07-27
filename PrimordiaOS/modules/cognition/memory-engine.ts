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
  private decayTime = 1000 * 60 * 5 // 5 minutes

  private cleanup() {
    const now = Date.now()
    this.memory = this.memory.filter(packet => {
      return now - packet.timestamp < this.decayTime
    })
  }

  store(packet: MemoryPacket) {
    if (!validateMemoryPacket(packet)) {
      throw new Error("Invalid memory packet structure")
    }

    this.cleanup()
    this.memory.push(packet)
  }

  recallById(id: string) {
    return this.memory.find(p => p.id === id)
  }

  recallByType(type: string) {
    return this.memory.filter(p => p.type === type)
  }

  purge() {
    this.memory = []
  }
}

export const Memory = new MemoryEngine()
