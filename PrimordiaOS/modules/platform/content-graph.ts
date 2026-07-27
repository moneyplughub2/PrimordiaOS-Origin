export type ContentType =
  | "tiktok_segment"
  | "technophysical_episode"
  | "podcast_episode"
  | "affiliate_promo"
  | "cosmic_visual"
  | "unreal_world";

export type ContentNode = {
  id: string;
  type: ContentType;
  title: string;
  channels: string[]; // e.g. ["tiktok", "technophysical", "moneyplughub"]
};

export class ContentGraph {
  private nodes = new Map<string, ContentNode>();

  add(node: ContentNode) {
    this.nodes.set(node.id, node);
  }

  get(id: string) {
    return this.nodes.get(id);
  }

  all() {
    return Array.from(this.nodes.values());
  }

  byChannel(channel: string) {
    return this.all().filter(n => n.channels.includes(channel));
  }
}

export const Content = new ContentGraph();
