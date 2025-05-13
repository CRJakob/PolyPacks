import { PolyMod, PolyModLoader } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
// IMPORTANT NOTE TO ME: COMMENT OUT BELOW LINE BEFORE PUSHING
// import { PolyMod, PolyModLoader } from "../PolyModLoader/PolyModLoader";

type Pack = {
    packName: string,
    packID: string,
    packAuthor: string,
    assetFolder: string,

    loaded: boolean,
};

type PackOverride = {
    folder: string,
    overrideFn: () => void,
};

class PolyPackBase extends PolyMod {
    // Mod specific stuff
    #pml: PolyModLoader
    #localStorage: Storage
    #polyVersion = "0.5.0"

    // For PolyPacks
    #packs: Array<Pack>
    #packUrls: Array<{ base: string, loaded: boolean }>

    // For registered pack mods
    #packOverrides: Array<PackOverride>

    init = (pmlInstance: PolyModLoader) => {
        this.#pml = pmlInstance;
        this.#localStorage = window.localStorage;
        (async () => {
            this.#importPacks();
        })();
    }

    /**
     * Register an asset folde to override.
     * 
     * @param folder - 
     */
    registerFolderOverride(
        folder: string,
        overrideFn: () => void
    ) {}

    #getPack(id: string): Pack | undefined {
        for (const pack of this.#packs) {
            if (pack.packID === id) return pack;
        }
    }

    async #addPack(polyPackURL: string)
    {
        try {
            const manifest = await fetch(`${polyPackURL}/manifest.json`).then(r => r.json());
            const pack = manifest.polypack;
            if (pack.targets.indexOf(this.#polyVersion) === -1) {
                alert(`Polypack ${pack.name} does not support current version.`);
                return;
            }

            this.#packs.push({
                packName: pack.name,
                packID: pack.id,
                packAuthor: pack.author,
                assetFolder: "assets",

                loaded: false,
            });
  
        } catch (err) {
            alert("Could not find manifest for polypack");
            console.error("Error in getting manifest: ", err);
        }
        this.#packUrls.push({
            base: polyPackURL,
            loaded: false,
        });
        this.#savePacksToLocalStorage();
    }

    #savePacksToLocalStorage() {
        if (this.#packUrls.length === 0) {
            this.#packUrls = [{
                base: "",
                loaded: true,
            }];
        }
        this.#localStorage.setItem("polypacks", JSON.stringify(this.#packUrls));
    }

    async #importPacks() {
        for (let packURL of this.#packUrls) {
            try {
                const manifestFile = await fetch(`${packURL.base}/manifest.json`).then(r => r.json());
                let pack = manifestFile.polypack;
                try {
                    if (this.getPack(pack.id)) {
                        alert(`Duplicate PolyPack detected: ${pack.name}`);
                        return;
                    }
                    this.#packs.push({
                        packName: pack.name,
                        packID: pack.id,
                        packAuthor: pack.author,
                        assetFolder: "assets",

                        loaded: packURL.loaded,
                    });
                } catch (err) {
                    alert(`Mod ${pack.name} failed to load.`);
                    console.error("Error in loading pack: ", err);
                }
            } catch (err) {
                alert(`Couldn't load polypack with URL ${packURL.base}.`);
                console.error("Error in loading pack URL:", err);
            }
        }
    }
}

export const polyMod = new PolyPackBase();
