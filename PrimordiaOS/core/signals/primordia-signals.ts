export type PhysicsPipelineUpdate = {
  object_id: string;
  force: number;
  vector: [number, number, number];
  timestamp: number;
};

export type PrimordiaSignal =
  | { type: "PhysicsPipeline_Update"; payload: PhysicsPipelineUpdate };
