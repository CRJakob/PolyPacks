// @ts-ignore
import { importPolyMod } from "https://pml.orangy.cfd/CRJakob/PolyPacks/dev/modpackTools.js";
// @ts-ignore
import { PolyMod, PolyModLoader } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
// IMPORTANT NOTE TO ME: COMMENT OUT BELOW LINE BEFORE PUSHING
// import { PolyMod, PolyModLoader } from "../../PolyModLoader/PolyModLoader";

type ModEntry = {
    url: string;
    version: string;
};

class PolyPacks extends PolyMod {
    // Mod specific stuff
    #pml: PolyModLoader;
    #modList: ModEntry[] = [];

    init = (pmlInstance: PolyModLoader) => {
        this.#pml = pmlInstance;
        this.#modList = [
            {
                url: "https://pml.orangy.cfd/CRJakob/PolyPacks/dev/PolyPack",
                version: "latest"
            },
            {
                url: "https://pml.orangy.cfd/CRJakob/PolyPacks/dev/ImagePack",
                version: "latest"
            }
        ];

        this.#modList.forEach(({ url, version }) => {
            importPolyMod(this.#pml, { url, version });
        });
    };

    postInit = () => {
        console.log(this.#pml.getMod("polypackbase"));
        // @ts-ignore
        this.#pml.getMod("polypackbase").applyOverrides();
    }
}

export const polyMod = new PolyPacks();
