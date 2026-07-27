export type UnrealRevisionUpdate = {
  revision: number;
  changelist: number;
  date: string;
};

export type UnrealPluginCapability = {
  plugin: string;
  enabled: boolean;
};

export type UnrealLightingWarning = {
  code: string;
  message: string;
  severity: number;
};
