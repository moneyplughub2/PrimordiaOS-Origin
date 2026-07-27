import { PrimordiaPostSkill } from "./skills/PrimordiaPostSkill";
import { PrimordiaCaptionSkill } from "./skills/PrimordiaCaptionSkill";
import { PrimordiaTagSkill } from "./skills/PrimordiaTagSkill";
// ...

const registry: Record<string, PrimordiaSkill> = {
  PrimordiaPostSkill,
  PrimordiaCaptionSkill,
  PrimordiaTagSkill,
  // PrimordiaScheduleSkill (when you add it)
};
