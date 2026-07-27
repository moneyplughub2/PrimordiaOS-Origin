export class ChannelRegistry {
    channels = [];
    register(config) {
        this.channels.push(config);
    }
    get(name) {
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
