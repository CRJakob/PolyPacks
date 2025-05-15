// @ts-ignore
import { PolyMod, PolyModLoader, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
// @ts-ignore
import { PolyPackBase } from "https://pml.orangy.cfd/CRJakob/PolyPacks/dev/PolyPack/0.1.0/main.mod.js";
// IMPORTANT NOTE TO ME: COMMENT OUT BELOW LINES BEFORE PUSHING
// import { PolyMod, PolyModLoader } from "../../PolyModLoader/PolyModLoader.ts";
// import { PolyPackBase } from "../../PolyPack/0.1.0/main.mod.ts";

class ImagePack extends PolyMod {
    // Mod specific stuff
    #pml: PolyModLoader
    #polypack: PolyPackBase

    init = (pmlInstance: PolyModLoader) => {
        this.#pml = pmlInstance;
        // @ts-ignore
        this.#polypack = this.#pml.getMod("polypacks");
    }
}

export const polyMod = new ImagePack();
