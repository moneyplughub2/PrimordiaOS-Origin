// ────────────────────────────────────────────────────────────
//  PrimordiaCaptionSkill.ts
//  Uses Primordial Antigravity to generate captions
// ────────────────────────────────────────────────────────────
import { PrimordiaAntigravityCore } from "../PrimordiaAntigravityCore";
import { PrimordiaLogStream } from "../PrimordiaLogStream";
export const PrimordiaCaptionSkill = {
    name: "PrimordiaCaptionSkill",
    description: "Generates AI captions via Primordial Antigravity.",
    async run(task) {
        const { payload } = task;
        const job = {
            id: `ag_caption_${task.id}`,
            type: "CAPTION_GENERATION",
            payload: {
                video_url: payload.video_url,
                existing_caption: payload.caption,
                tags: payload.tags,
            },
        };
        PrimordiaLogStream.recordInbound({
            event: "PrimordiaCaptionSkill.AntigravityJob",
            job,
            timestamp: new Date().toISOString(),
        });
        const result = await PrimordiaAntigravityCore.run(job);
        PrimordiaLogStream.recordOutbound({
            event: "PrimordiaCaptionSkill.AntigravityResult",
            result,
            timestamp: new Date().toISOString(),
        });
        if (!result.success) {
            return {
                success: false,
                caption: payload.caption,
                error: result.error,
            };
        }
        return {
            success: true,
            caption: result.data.caption,
        };
    },
};
