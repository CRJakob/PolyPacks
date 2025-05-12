import { PolyMod, PolyModLoader } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
// IMPORTANT NOTE TO ME: COMMENT OUT BELOW LINE BEFORE PUSHING
// import { PolyMod, PolyModLoader } from "../PolyModLoader/PolyModLoader";

class ResourcePackMod extends PolyMod {
    pml: PolyModLoader

    init = (pmlInstance: PolyModLoader) => {
        this.pml = pmlInstance;
    }
}

export const polyMod = new ResourcePackMod();
