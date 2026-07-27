export type PrimordiaMode = "LOW_POWER" | "HIGH_POWER" | "AUTONOMOUS";
export type PrimordiaRealm = "ASCENSION" | "VOID" | "SOCIAL" | "DESIGN";

export interface PrimordiaState {
    mode: PrimordiaMode;
    realm: PrimordiaRealm;
    evolutionLevel: number;

    memory: {
        shortTerm: any[];
        lore: any[];
        constraints: any[];
    };

    pluginProfile: "GOLDEN";
}

export const initialState: PrimordiaState = {
    mode: "HIGH_POWER",
    realm: "DESIGN",
    evolutionLevel: 1,

    memory: {
        shortTerm: [],
        lore: [],
        constraints: []
    },

    pluginProfile: "GOLDEN"
};
