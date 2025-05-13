import { PolyMod, PolyModLoader } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
// IMPORTANT NOTE TO ME: COMMENT OUT BELOW LINE BEFORE PUSHING
// import { PolyMod, PolyModLoader } from "../PolyModLoader/PolyModLoader";

class PolyPacks extends PolyMod {
    pml: PolyModLoader
    #packs: Array<{
        packName: string,
        packID: string,
        packAuthor: string,
        assetFolder: string,

        loaded: boolean,
    }>
    #packUrls: Array<{ base: string, loaded: boolean }>

    init = (pmlInstance: PolyModLoader) => {
        this.pml = pmlInstance;
        (async () => {
            this.#importPacks();
        })();
    }

    #savePacksToLocalStorage() {
        // let savedPacks: Array<{ base: string, loaded: boolean }> = [];
        // this.#packUrls = savedPacks;
        if (this.#packUrls === []) {
            this.#packUrls = [{
                base: ""
            }];
        }
        this.localStoragimportPacks"polypacks", JSON.stringify(this.#packUrls));
    }

    async #importMods() {
        for (let polyModObject of this.#polyModUrls) {
            let latest = false;
            if (polyModObject.version === "latest") {
                try {
                    const latestFile = await fetch(`${polyModObject.base}/latest.json`).then(r => r.json());
                    polyModObject.version = latestFile[this.#polyVersion];
                    latest = true;
                } catch (err) {
                    alert(`Couldn't find latest version for ${polyModObject.base}`);
                    console.error("Error in fetching latest version json:", err);
                }
            }
            const polyModUrl = `${polyModObject.base}/${polyModObject.version}`;
            try {
                const manifestFile = await fetch(`${polyModUrl}/manifest.json`).then(r => r.json());
                let mod = manifestFile.polymod;
                try {
                    const modImport = await import(`${polyModUrl}/${mod.main}`);

                    let newMod = modImport.polyMod;
                    mod.version = polyModObject.version;
                    if (this.getMod(mod.id)) alert(`Duplicate mod detected: ${mod.name}`);
                    newMod.applyManifest(manifestFile);
                    newMod.baseUrl = polyModObject.base;
                    newMod.applyManifest = (nothing) => { console.warn("Can't apply manifest after initialization!") }
                    newMod.savedLatest = latest;
                    newMod.iconSrc = `${polyModUrl}/icon.png`;
                    if (polyModObject.loaded) {
                        newMod.setLoaded = true;
                        if (newMod.touchesPhysics) {
                            this.#physicsTouched = true;
                            this.registerClassMixin("HB.prototype", "submitLeaderboard", MixinType.OVERRIDE, [], (e, t, n, i, r, a) => { })
                        }
                    }
                    this.#allMods.push(newMod);
                } catch (err) {
                    alert(`Mod ${mod.name} failed to load.`);
                    console.error("Error in loading mod:", err);
                }
            } catch (err) {
                alert(`Couldn't load mod with URL ${polyModUrl}.`);
                console.error("Error in loading mod URL:", err);
            }
        }
    }

    async #addPack(polyPackURL: string)
    {

        try {
            const manifest = await fetch(`${polyPackURL}/manifest.json`).then(r => r.json());
            const polyPack = manifest.polypack;
            if (polyPack.targets.indexOf(this.polyVersion) === -1) {
                alert(`Polypack ${polyPack.name} does not support current version.`);
                return;
            }

            const packObj = {};
            this.#applyManifest(manifest, packObj);
            packObj.loaded = false;
            this.#packs.push(packObj);
  
        } catch (err) {
            alert("Could not find manifest for polypack");
            console.error(err);
        }
        
        this.#packUrls.push({base : base});
        this.savePacksToLocalStorage();
    }

    #applyManifest(
        manifest: { polypack: { name: string, id:string, author: string, targets: Array<string> }},
        packObj: Object,
    ) {
        const pack = manifest.polypack;
        packObj.packName = pack.name;
        packObj.packID = pack.id;
        packObj.packAuthor = pack.author;   

        packObj.polyVersion = pack.targets;
        packObj.assetFolder = "assets";
    }
}

export const polyMod = new PolyPacks();
