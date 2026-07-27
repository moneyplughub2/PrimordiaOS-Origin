// ────────────────────────────────────────────────────────────
//  PrimordiaSkillOrchestrator.ts
//  The Kernel Module Loader of PrimordiaOS
//  Registers → Resolves → Executes Skills
// ────────────────────────────────────────────────────────────

import { PrimordiaPostSkill } from "./skills/PrimordiaPostSkill";
import { PrimordiaCaptionSkill } from "./skills/PrimordiaCaptionSkill";
import { PrimordiaTagSkill } from "./skills/PrimordiaTagSkill";
import { PrimordiaScheduleSkill } from "./skills/PrimordiaScheduleSkill";
import { PrimordiaLogStream } from "./PrimordiaLogStream";

export interface PrimordiaTask {
  id: string;
  type: string;
  payload: any;
}

export interface PrimordiaSkill {
  name: string;
  description: string;
  run(task: PrimordiaTask): Promise<any>;
}

// Skill registry
const registry: Record<string, PrimordiaSkill> = {
  PrimordiaPostSkill,
  PrimordiaCaptionSkill,
  PrimordiaTagSkill,
  PrimordiaScheduleSkill,
};

export const PrimordiaSkillOrchestrator = {
  // Resolve a skill by name
  resolve(skillName: string): PrimordiaSkill {
    const skill = registry[skillName];
    if (!skill) {
      throw new Error(`PrimordiaSkill not found: ${skillName}`);
    }
    return skill;
  },

  // Execute a skill with a given task
  async execute(skillName: string, task: PrimordiaTask): Promise<any> {
    const skill = this.resolve(skillName);

    PrimordiaLogStream.recordInbound({
      event: "PrimordiaSkillOrchestrator.Execute",
      skill: skill.name,
      task_id: task.id,
      type: task.type,
      timestamp: new Date().toISOString(),
    });

    const result = await skill.run(task);

    PrimordiaLogStream.recordOutbound({
      event: "PrimordiaSkillOrchestrator.Result",
      skill: skill.name,
      task_id: task.id,
      result,
      timestamp: new Date().toISOString(),
    });

    return result;
  },
};
