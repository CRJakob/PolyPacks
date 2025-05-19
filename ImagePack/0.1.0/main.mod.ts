// @ts-ignore
import { PolyMod, PolyModLoader, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
// @ts-ignore
import { PolyPackBase } from "https://pml.orangy.cfd/CRJakob/PolyPacks/dev/PolyPack/0.1.0/main.mod.js";
// IMPORTANT NOTE TO ME: COMMENT OUT BELOW LINES BEFORE PUSHING
// import { PolyMod, PolyModLoader, MixinType } from "../../PolyModLoader/PolyModLoader";
// import { PolyPackBase } from "../../PolyPack/0.1.0/main.mod";

type texture = {
    defaultPath: String,
    customPath: String
};

class ImagePack extends PolyMod {
    // Mod specific stuff
    #pml: PolyModLoader
    #polypack: PolyPackBase
    #textures: Array<texture> = [
        {
            defaultPath: "images/apply.svg",
            customPath: ""
        },
        {
            defaultPath: "images/arrow_up.svg",
            customPath: ""
        },
        {
            defaultPath: "images/settings.svg",
            customPath: "polypack/images/settings.svg"
        }
    ]


    init = (pmlInstance: PolyModLoader) => {
        this.#pml = pmlInstance;
        // itsso laggy hen we are both typing at thessame time lol
        // @ts-ignore
        this.#polypack = this.#pml.getMod("polypackbase");

        const images: Array<string> = [];
        // @ts-ignore
        for (const str of this.#pml.getFromPolyTrack("n")(7780).exports) {
            images.push(str.substring(2));
        }

        this.#polypack.registerFolderOverride(
            "images",
            images,
            this.#initMixin,
            undefined,
        );
    }

    #initMixin() {
        this.#pml.registerClassMixin("oN", "preloadImage", MixinType.INSERT, "this.addResource();",
            // @ts-ignore
            (applyImageMixins) => {
                // @ts-ignore
                if (this.#textures.find(e)) { }
            }
        );
    }
}

export const polyMod = new ImagePack();
