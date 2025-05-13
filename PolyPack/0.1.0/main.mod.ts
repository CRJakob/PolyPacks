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

    setPackLoaded(pack, state) {
        if (!pack) return;
        pack.loaded = state;
        this.savePacksToLocalStorage();
    }

    // reorder mod function
    reorderPack(pack: PolyPack, delta: number) {
        if (!pack) return;
        const currentIndex = this.#packs.indexOf(pack);
        if ((currentIndex === 1) || delta > 0) return;
        if (currentIndex === null || currentIndex === undefined) {
        alert("This pack isn't loaded");
            return;
        }
        const temp = this.#packs[currentIndex + delta];
        this.#packs[currentIndex + delta] = this.#packs[currentIndex];
        this.#packs[currentIndex] = temp;
        this.savePacksToLocalStorage();
    }

    // UI STUFF

    // pml add mod screen
    promptUserForNewMod = (n) => {
        let menuDiv = document.getElementById("ui").children[0];
    
        let promptDiv = document.createElement("div")
        promptDiv.className = "nickname";
        
        let packUrlHead = document.createElement("h1");
        modUrlHead.innerText = "Pack URL";
        modUrlHead.style = "float: left;";
        promptDiv.appendChild(packUrlHead);
    
        let urlInput = document.createElement("input")
        urlInput.type = "text";
        promptDiv.appendChild(urlInput);
 
        let importButton = document.createElement("button");
        importButton.style = "float: right;"
        importButton.className = "button right";
        importButton.innerHTML = `<img class="button-icon" src="images/import.svg"> Import`
        importButton.addEventListener("click", () => {
            n.playUIClick();
            let packUrl = urlInput.value;
            this.#addPack({"base": packUrl}).then(() => {
                promptDiv.remove();
               this.createPackScreen(n);
            })
        })
        promptDiv.appendChild(importButton);
    
        let goBackButton = document.createElement("button");
        goBackButton.style = "float: left;"
        goBackButton.className = "button left";
        goBackButton.innerHTML = `<img class="button-icon" src="images/back.svg"> Back`
        goBackButton.addEventListener("click", () => {
            n.playUIClick();
            promptDiv.remove();
           this.createPackScreen(n);
        })
        promptDiv.appendChild(goBackButton);
    
        menuDiv.appendChild(promptDiv);
    }

    // pml mod screen ui
    createPackScreen = (n) => {
        let menuDiv;
        for(let elem of document.getElementById("ui").children) {
            if(elem.classList.contains("menu")) {
                menuDiv = elem;
            }
        }
        let hideList = [0,1,3,4,5,6]
        for(let intToHide of hideList) {
            menuDiv.children[intToHide].classList.add("hidden")
        }
    
        let selectedPack;
    
        let packsDiv = document.createElement('div');
        packsDiv.className = "track-info";
    
        let availablePacksList = document.createElement("div");
        availablePacksList.className = "leaderboard";
    
        let availablePacksLabel = document.createElement("h2")
        availablePacksLabel.textContent = "Available"
        availablePacksList.appendChild(availablePacksLabel)
    
        let activatedPacksList = document.createElement("div");
        activatedPacksList.className = "leaderboard";
    
        let packActivatedLabel = document.createElement("h2")
        packActivatedLabel.textContent = "Loaded"
        activatedPacksList.appendChild(packActivatedLabel)
    
        let activatedPacksContainer = document.createElement("div")
        activatedPacksContainer.className = "container";
        activatedPacksList.appendChild(activatedPacksContainer);
    
        let buttonWrapper = document.createElement("div")
        buttonWrapper.className = "button-wapper"
        activatedPacksList.appendChild(buttonWrapper)
    
        let unloadButton = document.createElement('button');
        unloadButton.className = "button first";
        unloadButton.disabled = true;
        unloadButton.style = "margin: 10px 0; float: left;padding: 10px; margin-left:2px;"
        unloadButton.innerHTML = `<img class="button-icon" src="images/arrow_left.svg"> Unload`;
        unloadButton.addEventListener("click", () => {
            // still need to implement getPack func: let mod = this.modPmlInstance.getMod(selectedPack.id.replace("mod:", ""));
            // same thing: this.modPmlInstance.setModLoaded(mod, false);
            packsDiv.remove();
           this.createPackScreen(n);
        })
    
        buttonWrapper.appendChild(unloadButton);
    
        let goUpButton = document.createElement('button');
        goUpButton.className = "button first";
        goUpButton.disabled = true;
        goUpButton.style = "margin: 10px; float: left;padding: 10px"
        goUpButton.innerHTML = `<img class="button-icon" src="images/arrow_up.svg" style="margin: 0px 10px">`;
        goUpButton.addEventListener("click", () => {
            let mod = this.getMod(selectedPack.id.replace("mod:", ""));
            this.reorderMod(mod, -1);
            packsDiv.remove();
           this.createPackScreen(n);
        })
        buttonWrapper.appendChild(goUpButton);
    
        let goDownButton = document.createElement('button');
        goDownButton.className = "button first";
        goDownButton.disabled = true;
        goDownButton.style = "margin: 10px 0; float: left;padding: 10px"
        goDownButton.innerHTML = `<img class="button-icon" src="images/arrow_down.svg" style="margin: 0px 10px">`;
        goDownButton.addEventListener("click", () => {
            // same thing let mod = this.modPmlInstance.getMod(selectedPack.id.replace("mod:", ""));
            this.reorderMod(mod, 1);
            packsDiv.remove();
           this.createPackScreen(n);
        })
        buttonWrapper.appendChild(goDownButton);
    
        let applyButton = document.createElement('button');
        applyButton.className = "button first";
        applyButton.addEventListener("click", () => {n.playUIClick();location.reload()})
        applyButton.style = "margin: 10px 0; float: right;padding: 10px"
        applyButton.innerHTML = `Apply <img class="button-icon" src="images/checkmark.svg" style="margin: 0 5">`;
        buttonWrapper.appendChild(applyButton)
    
        let availableModsContainer = document.createElement("div")
        availableModsContainer.className = "container";
        availablePacksList.appendChild(availableModsContainer);
        for(let polyMod of this.modPmlInstance.getAllMods()) {
            let modDiv = document.createElement('div');
            modDiv.style = `--text-color: #fff;
        --text-disabled-color: #5d6a7c;
        --surface-color: #28346a;
        --surface-secondary-color: #212b58;
        --surface-tertiary-color: #192042;
        --surface-transparent-color: rgba(40, 52, 106, 0.5);
        --button-color: #112052;
        --button-hover-color: #334b77;
        --button-active-color: #151f41;
        --button-disabled-color: #313d53;
        scrollbar-color: #7272c2 #223;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        text-align: left;
        pointer-events: auto;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        position: relative;
        margin: 10px 10px 0 10px;
        padding: 0;`
    
            let modMainButton = document.createElement('button');
            modMainButton.id = `mod:${polyMod.id}`;
            modMainButton.className = "button"
            modMainButton.style = `    --text-color: #fff;
        --text-disabled-color: #5d6a7c;
        --surface-color: #28346a;
        --surface-secondary-color: #212b58;
        --surface-tertiary-color: #192042;
        --surface-transparent-color: rgba(40, 52, 106, 0.5);
        --button-color: #112052;
        --button-hover-color: #334b77;
        --button-active-color: #151f41;
        --button-disabled-color: #313d53;
        scrollbar-color: #7272c2 #223;
        -webkit-tap-highlight-color: transparent;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        position: relative;
        border: none;
        color: var(--text-color);
        font-size: 32px;
        pointer-events: auto;
        user-select: none;
        cursor: pointer;
        margin: 0;
        padding: 0;
        vertical-align: top;
        width: 100%;
        height: 100px;
        clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        text-align: left;
        white-space: nowrap;`;
            modMainButton.innerHTML = `<img src="${polyMod.iconSrc}" style="max-width:100px;max-height=100px;">`;
            modMainButton.addEventListener("click", () => {
                if(!polyMod.isLoaded) {
                    goUpButton.disabled = true;
                    goDownButton.disabled = true;
                    unloadButton.disabled = true;
                    loadButton.disabled = false;
                    removeButton.disabled = false;
                } else {
                    removeButton.disabled = true;
                    unloadButton.disabled = false;
                    loadButton.disabled = true;
                    goUpButton.disabled = false;
                    goDownButton.disabled = false;
                    if(activatedPacksContainer.children[0] === modMainButton) {
                        goUpButton.disabled = true;
                    } 
                    if(activatedPacksContainer.children[activatedPacksContainer.children.length - 1] === modMainButton) {
                        goDownButton.disabled = true;
                    }
                }
                if(selectedPack === modMainButton) {
                    goUpButton.disabled = true;
                    goDownButton.disabled = true;
                    unloadButton.disabled = true;
                    loadButton.disabled = true;
                    removeButton.disabled = true;
                    modMainButton.style = `    --text-color: #fff;
        --text-disabled-color: #5d6a7c;
        --surface-color: #28346a;
        --surface-secondary-color: #212b58;
        --surface-tertiary-color: #192042;
        --surface-transparent-color: rgba(40, 52, 106, 0.5);
        --button-color: #112052;
        --button-hover-color: #334b77;
        --button-active-color: #151f41;
        --button-disabled-color: #313d53;
        scrollbar-color: #7272c2 #223;
        -webkit-tap-highlight-color: transparent;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        position: relative;
        border: none;
        color: var(--text-color);
        font-size: 32px;
        pointer-events: auto;
        user-select: none;
        cursor: pointer;
        margin: 0;
        padding: 0;
        vertical-align: top;
        width: 100%;
        height: 100px;
        clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        text-align: left;
        white-space: nowrap;`
                    selectedPack = null;
                } else {
                    if(selectedPack) {
                        selectedPack.style = `    --text-color: #fff;
                        --text-disabled-color: #5d6a7c;
                        --surface-color: #28346a;
                        --surface-secondary-color: #212b58;
                        --surface-tertiary-color: #192042;
                        --surface-transparent-color: rgba(40, 52, 106, 0.5);
                        --button-color: #112052;
                        --button-hover-color: #334b77;
                        --button-active-color: #151f41;
                        --button-disabled-color: #313d53;
                        scrollbar-color: #7272c2 #223;
                        -webkit-tap-highlight-color: transparent;
                        font-family: ForcedSquare, Arial, sans-serif;
                        line-height: 1;
                        position: relative;
                        border: none;
                        color: var(--text-color);
                        font-size: 32px;
                        pointer-events: auto;
                        user-select: none;
                        cursor: pointer;
                        margin: 0;
                        padding: 0;
                        vertical-align: top;
                        width: 100%;
                        height: 100px;
                        clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
                        text-align: left;
                        white-space: nowrap;`
                    }
                    modMainButton.style = `    --text-color: #fff;
                    --text-disabled-color: #5d6a7c;
                    --surface-color: #28346a;
                    --surface-secondary-color: #212b58;
                    --surface-tertiary-color: #192042;
                    --surface-transparent-color: rgba(40, 52, 106, 0.5);
                    --button-color: #112052;
                    --button-hover-color: #334b77;
                    --button-active-color: #151f41;
                    --button-disabled-color: #313d53;
                    scrollbar-color: #7272c2 #223;
                    -webkit-tap-highlight-color: transparent;
                    font-family: ForcedSquare, Arial, sans-serif;
                    background: var(--button-hover-color);
                    line-height: 1;
                    position: relative;
                    border: none;
                    color: var(--text-color);
                    font-size: 32px;
                    pointer-events: auto;
                    user-select: none;
                    cursor: pointer;
                    margin: 0;
                    padding: 0;
                    vertical-align: top;
                    width: 100%;
                    height: 100px;
                    clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
                    text-align: left;
                    white-space: nowrap;`
                    selectedPack = modMainButton;
                }
            })
    
            let leftDiv = document.createElement("div");
            leftDiv.style = `    --text-color: #fff;
        --text-disabled-color: #5d6a7c;
        --surface-color: #28346a;
        --surface-secondary-color: #212b58;
        --surface-tertiary-color: #192042;
        --surface-transparent-color: rgba(40, 52, 106, 0.5);
        --button-color: #112052;
        --button-hover-color: #334b77;
        --button-active-color: #151f41;
        --button-disabled-color: #313d53;
        scrollbar-color: #7272c2 #223;
        -webkit-tap-highlight-color: transparent;
        color: var(--text-color);
        font-size: 32px;
        pointer-events: auto;
        user-select: none;
        cursor: pointer;
        text-align: left;
        white-space: nowrap;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        display: inline-block;
        vertical-align: top;`
            leftDiv.innerHTML = `<p style="    --text-color: #fff;
        --text-disabled-color: #5d6a7c;
        --surface-color: #28346a;
        --surface-secondary-color: #212b58;
        --surface-tertiary-color: #192042;
        --surface-transparent-color: rgba(40, 52, 106, 0.5);
        --button-color: #112052;
        --button-hover-color: #334b77;
        --button-active-color: #151f41;
        --button-disabled-color: #313d53;
        scrollbar-color: #7272c2 #223;
        -webkit-tap-highlight-color: transparent;
        pointer-events: auto;
        user-select: none;
        cursor: pointer;
        text-align: left;
        white-space: nowrap;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        margin: 0;
        padding: 12px;
        font-size: 28px;
        color: var(--text-color);">  ${polyMod.name} <u>${polyMod.version}</u></p><p style="    --text-color: #fff;
        --text-disabled-color: #5d6a7c;
        --surface-color: #28346a;
        --surface-secondary-color: #212b58;
        --surface-tertiary-color: #192042;
        --surface-transparent-color: rgba(40, 52, 106, 0.5);
        --button-color: #112052;
        --button-hover-color: #334b77;
        --button-active-color: #151f41;
        --button-disabled-color: #313d53;
        scrollbar-color: #7272c2 #223;
        -webkit-tap-highlight-color: transparent;
        pointer-events: auto;
        user-select: none;
        cursor: pointer;
        text-align: left;
        white-space: nowrap;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        margin: 0;
        padding: 12px;
        font-size: 28px;
        color: var(--text-color);">  By ${polyMod.author}</p>`
            
            let rightDiv = document.createElement("div");
            rightDiv.style = `    --text-color: #fff;
        --text-disabled-color: #5d6a7c;
        --surface-color: #28346a;
        --surface-secondary-color: #212b58;
        --surface-tertiary-color: #192042;
        --surface-transparent-color: rgba(40, 52, 106, 0.5);
        --button-color: #112052;
        --button-hover-color: #334b77;
        --button-active-color: #151f41;
        --button-disabled-color: #313d53;
        scrollbar-color: #7272c2 #223;
        -webkit-tap-highlight-color: transparent;
        color: var(--text-color);
        font-size: 32px;
        pointer-events: auto;
        user-select: none;
        cursor: pointer;
        text-align: left;
        white-space: nowrap;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        display: inline-block;
        vertical-align: top;`
    
            modMainButton.appendChild(leftDiv);
            modMainButton.appendChild(rightDiv);
            modDiv.appendChild(modMainButton);
            let infoButton = document.createElement("button");
            infoButton.innerHTML = `<img src="images/help.svg">`;
            infoButton.className = "button";
            infoButton.style = `    --text-color: #fff;
        --text-disabled-color: #5d6a7c;
        --surface-color: #28346a;
        --surface-secondary-color: #212b58;
        --surface-tertiary-color: #192042;
        --surface-transparent-color: rgba(40, 52, 106, 0.5);
        --button-color: #112052;
        --button-hover-color: #334b77;
        --button-active-color: #151f41;
        --button-disabled-color: #313d53;
        scrollbar-color: #7272c2 #223;
        -webkit-tap-highlight-color: transparent;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        border: none;
        color: var(--text-color);
        font-size: 32px;
        pointer-events: auto;
        user-select: none;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        margin: 8px;
        padding: 0 9px;
        background-color: var(--surface-color);
        clip-path: polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%);`;
            infoButton.addEventListener("click", () => {
                packsDiv.remove();
                n.playUIClick();
                this.openDescription(n, polyMod);
            })
            modDiv.appendChild(infoButton);
            if(polyMod.isLoaded) {
                activatedPacksContainer.appendChild(modDiv)
            } else {
                availableModsContainer.appendChild(modDiv);
            }
        }
    
        let backButtonWrapper = document.createElement("div")
        backButtonWrapper.className = "button-wapper"
        
        let backButton = document.createElement('button');
        backButton.className = "button back";
        backButton.style = "margin: 10px 0; float: left;padding: 10px"
        backButton.innerHTML = `<img class="button-icon" src="images/back.svg" style="margin: 0 5"> Back`;
        backButton.addEventListener("click", () => {
            n.playUIClick();
            for(let intToUnhide of hideList) {
                menuDiv.children[intToUnhide].classList.remove("hidden")
            }
            packsDiv.remove()
        })
        backButtonWrapper.appendChild(backButton);
    
        let addButton = document.createElement('button');
        addButton.className = "button back";
        addButton.style = "margin: 10px 0; float: left;padding: 10px"
        addButton.innerHTML = `<img class="button-icon" src="images/load.svg" style="margin: 0 5"> Add`;
        addButton.addEventListener("click", () => {
            n.playUIClick();
            packsDiv.remove();
            this.promptUserForNewMod(n);
        })
        backButtonWrapper.appendChild(addButton)
    
        let removeButton = document.createElement('button');
        removeButton.className = "button back";
        removeButton.style = "margin: 10px 0; float: left;padding: 10px; margin-left: 0px;"
        removeButton.innerHTML = `<img class="button-icon" src="images/erase.svg" style="margin: 0 5"> Remove`;
        removeButton.addEventListener("click", () => {
            n.playUIClick();
            this.modPmlInstance.removeMod(this.modPmlInstance.getMod(selectedPack.id.replace("mod:", "")));
            packsDiv.remove();
           this.createPackScreen(n);
        })
        removeButton.disabled = true;
        backButtonWrapper.appendChild(removeButton)
    
        let loadButton = document.createElement('button');
        loadButton.className = "button first";
        loadButton.disabled = true;
        loadButton.style = "margin: 10px 0; float: right;padding: 10px; margin-right:2px;"
        loadButton.innerHTML = `Load <img class="button-icon" src="images/arrow_right.svg">`;
        loadButton.addEventListener("click", () => {
            let mod = this.modPmlInstance.getMod(selectedPack.id.replace("mod:", ""));
            this.modPmlInstance.setModLoaded(mod, true);
            packsDiv.remove();
           this.createPackScreen(n);
        })
    
        backButtonWrapper.appendChild(loadButton);
        availablePacksList.appendChild(backButtonWrapper)
        
        packsDiv.appendChild(availablePacksList)
        packsDiv.appendChild(activatedPacksList)
        menuDiv.appendChild(packsDiv);
    }
}

export const polyMod = new PolyPackBase();
