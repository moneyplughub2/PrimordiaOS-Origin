// ────────────────────────────────────────────────────────────
//  PrimordiaTagSkill.ts
//  Uses Primordial Antigravity to generate tags
// ────────────────────────────────────────────────────────────

import { PrimordiaAntigravityCore } from "../PrimordiaAntigravityCore";
import { PrimordiaLogStream } from "../PrimordiaLogStream";

export const PrimordiaTagSkill = {
  name: "PrimordiaTagSkill",
  description: "Generates AI tags via Primordial Antigravity.",

  async run(task: any) {
    const { payload } = task;

    const job = {
      id: `ag_tags_${task.id}`,
      type: "TAG_GENERATION",
      payload: {
        caption: payload.caption,
        video_url: payload.video_url,
      },
    };

    PrimordiaLogStream.recordInbound({
      event: "PrimordiaTagSkill.AntigravityJob",
      job,
      timestamp: new Date().toISOString(),
    });

    const result = await PrimordiaAntigravityCore.run(job);

    PrimordiaLogStream.recordOutbound({
      event: "PrimordiaTagSkill.AntigravityResult",
      result,
      timestamp: new Date().toISOString(),
    });

    if (!result.success) {
      return {
        success: false,
        tags: payload.tags,
        error: result.error,
      };
    }

    return {
      success: true,
      tags: result.data.tags,
    };
  },
};
