import { PolyMod, PolyModLoader } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
// IMPORTANT NOTE TO ME: COMMENT OUT BELOW LINE BEFORE PUSHING
// import { PolyMod, PolyModLoader } from "../PolyModLoader/PolyModLoader";

class PolyPacks extends PolyMod {
    pml: PolyModLoader

    savePacksToLocalStorage() {
        let savedPacks: Array<{ base: string, loaded: boolean }> = [];
        this.#packUrls = savedPacks;
        this.localStorage.setItem("resourcepacks", JSON.stringify(this.#packUrls));
    };

    init = (pmlInstance: PolyModLoader) => {
        this.pml = pmlInstance;
        
    }
}

export const polyMod = new PolyPacks();
