interface MemoryPacket {
  id: string
  type: string
  timestamp: number
  payload: any
  relevance?: number
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
  private longTerm: MemoryPacket[] = []
  private decayTime = 1000 * 60 * 5 // 5 minutes

  private cleanup() {
    const now = Date.now()
    this.memory = this.memory.filter(packet => {
      return now - packet.timestamp < this.decayTime
    })
  }

  private score(packet: MemoryPacket): number {
    let score = 0

    // Rule 1: newer memories are more relevant
    const age = Date.now() - packet.timestamp
    score += Math.max(0, 10000 - age) / 1000

    // Rule 2: important packets get a boost
    if (packet.type === "important") {
      score += 5
    }

    // Rule 3: payload complexity adds weight
    if (packet.payload && typeof packet.payload === "object") {
      score += Object.keys(packet.payload).length * 0.1
    }

    return score
  }

  private consolidate(packet: MemoryPacket) {
    // simple rule: promote packets marked "important"
    if (packet.type === "important") {
      this.longTerm.push(packet)
    }
  }

  store(packet: MemoryPacket) {
    if (!validateMemoryPacket(packet)) {
      throw new Error("Invalid memory packet structure")
    }

    this.cleanup()

    packet.relevance = this.score(packet)

    this.memory.push(packet)
    this.consolidate(packet)
  }

  recallById(id: string) {
    return this.memory.find(p => p.id === id)
  }

  recallByType(type: string) {
    return this.memory.filter(p => p.type === type)
  }

  recallLongTermById(id: string) {
    return this.longTerm.find(p => p.id === id)
  }

  recallLongTermByType(type: string) {
    return this.longTerm.filter(p => p.type === type)
  }

  recallMostRelevant() {
    return this.memory
      .slice()
      .sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0))[0]
  }

  recallMostRelevantLongTerm() {
    return this.longTerm
      .slice()
      .sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0))[0]
  }

  promote(packet: MemoryPacket) {
    if (!validateMemoryPacket(packet)) return
    packet.relevance = this.score(packet)
    this.longTerm.push(packet)
  }

  purge() {
    this.memory = []
  }
}

export const Memory = new MemoryEngine()
