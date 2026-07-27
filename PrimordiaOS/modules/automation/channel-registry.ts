export type ChannelName =
  | "tiktok"
  | "tiktok_live"
  | "instagram"
  | "youtube"
  | "twitter"
  | "threads"
  | "moneyplughub"
  | "technophysical"
  | "podcast";

export type ChannelConfig = {
  name: ChannelName;
  enabled: boolean;
  apiKey?: string;
  accessToken?: string;
};

export class ChannelRegistry {
  private channels: ChannelConfig[] = [];

  register(config: ChannelConfig) {
    this.channels.push(config);
  }

  get(name: ChannelName) {
    return this.channels.find(c => c.name === name && c.enabled);
  }

  all() {
    return this.channels.filter(c => c.enabled);
  }
}

export const Channels = new ChannelRegistry();

// bootstrap
Channels.register({ name: "technophysical", enabled: true });
Channels.register({ name: "moneyplughub", enabled: true });
Channels.register({ name: "tiktok", enabled: true });
Channels.register({ name: "tiktok_live", enabled: true });
