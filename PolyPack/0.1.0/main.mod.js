"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PolyPackBase_instances, _PolyPackBase_pml, _PolyPackBase_localStorage, _PolyPackBase_polyVersion, _PolyPackBase_packs, _PolyPackBase_packUrls, _PolyPackBase_packOverrides, _PolyPackBase_getPack, _PolyPackBase_getAllPacks, _PolyPackBase_addPack, _PolyPackBase_removePack, _PolyPackBase_savePacksToLocalStorage, _PolyPackBase_importPacks, _PolyPackBase_setPackLoaded, _PolyPackBase_reorderPack, _PolyPackBase_openDescription, _PolyPackBase_promptUserForNewPack, _PolyPackBase_createPackScreen;
Object.defineProperty(exports, "__esModule", { value: true });
exports.polyMod = void 0;
// @ts-ignore
const PolyModLoader_js_1 = require("https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js");
class PolyPackBase extends PolyModLoader_js_1.PolyMod {
    constructor() {
        super(...arguments);
        _PolyPackBase_instances.add(this);
        // Mod specific stuff
        _PolyPackBase_pml.set(this, void 0);
        _PolyPackBase_localStorage.set(this, void 0);
        _PolyPackBase_polyVersion.set(this, "0.5.0"
        // For PolyPacks
        );
        // For PolyPacks
        _PolyPackBase_packs.set(this, []);
        _PolyPackBase_packUrls.set(this, []
        // For registered pack mods
        );
        // For registered pack mods
        _PolyPackBase_packOverrides.set(this, []);
        this.init = (pmlInstance) => {
            __classPrivateFieldSet(this, _PolyPackBase_pml, pmlInstance, "f");
            __classPrivateFieldSet(this, _PolyPackBase_localStorage, window.localStorage, "f");
            __classPrivateFieldGet(this, _PolyPackBase_pml, "f").registerFuncMixin("hD", PolyModLoader_js_1.MixinType.INSERT, `vD(this, aD, [], "f");`, () => {
                const e = document.createElement("button");
                e.className = "button small";
                e.innerHTML = '<img src="images/windowed.svg">';
                e.appendChild(document.createTextNode("Polypacks"));
                e.addEventListener("click", (() => {
                    // @ts-ignore
                    n.playUIClick();
                    // @ts-ignore
                    __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
                }));
            });
            (async () => {
                __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_importPacks).call(this);
            })();
        };
        // UI STUFF
        _PolyPackBase_openDescription.set(this, function (n, pack) {
            const menuDiv = document.getElementById("ui")?.children[0];
            const trackInfoDiv = document.createElement('div');
            trackInfoDiv.style = `    interpolate-size: allow-keywords;
        --text-color: #fff;
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
        pointer-events: none;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        text-align: center;
        font-style: italic;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        position: absolute;
        left: calc(50% - 1050px / 2);
        top: 0;
        z-index: 2;
        display: flex;
        margin: 0;
        padding: 0;
        width: 1000px;
        height: 100%;`;
            const containerDiv = document.createElement("div");
            containerDiv.style = `    interpolate-size: allow-keywords;
        --text-color: #fff;
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
        font-style: italic;
        font-family: ForcedSquare, Arial, sans-serif;
        line-height: 1;
        margin: 0;
        padding: 0;
        flex-grow: 1;
        background-color: var(--surface-secondary-color);
        overflow-x: hidden;
        overflow-y: scroll;
        pointer-events: auto;`;
            const goBackButton = document.createElement("button");
            goBackButton.style = "float: left;";
            goBackButton.className = "button left";
            goBackButton.innerHTML = `<img class="button-icon" src="images/back.svg"> Back`;
            goBackButton.addEventListener("click", () => {
                n.playUIClick();
                trackInfoDiv.remove();
                __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
            });
            containerDiv.appendChild(goBackButton);
            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `<h2> Loading... </h2>`;
            fetch(`${pack.baseUrl}/description.html`).then(res => {
                if (res.status !== 200) {
                    trackInfoDiv.remove();
                    __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
                    alert("This pack doesn't have a description file.");
                    return;
                }
                else {
                    return res.text();
                }
            }).then((response) => {
                infoDiv.innerHTML = response;
            });
            containerDiv.appendChild(infoDiv);
            trackInfoDiv.appendChild(containerDiv);
            menuDiv.appendChild(trackInfoDiv);
        }
        // pml add pack screen
        );
        // pml add pack screen
        _PolyPackBase_promptUserForNewPack.set(this, (n) => {
            const menuDiv = document.getElementById("ui")?.children[0];
            const promptDiv = document.createElement("div");
            promptDiv.className = "nickname";
            const packUrlHead = document.createElement("h1");
            packUrlHead.innerText = "Pack URL";
            packUrlHead.style = "float: left;";
            promptDiv.appendChild(packUrlHead);
            const urlInput = document.createElement("input");
            urlInput.type = "text";
            promptDiv.appendChild(urlInput);
            const importButton = document.createElement("button");
            importButton.style = "float: right;";
            importButton.className = "button right";
            importButton.innerHTML = `<img class="button-icon" src="images/import.svg"> Import`;
            importButton.addEventListener("click", () => {
                n.playUIClick();
                let packUrl = urlInput.value;
                __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_addPack).call(this, packUrl).then(() => {
                    promptDiv.remove();
                    __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
                });
            });
            promptDiv.appendChild(importButton);
            const goBackButton = document.createElement("button");
            goBackButton.style = "float: left;";
            goBackButton.className = "button left";
            goBackButton.innerHTML = `<img class="button-icon" src="images/back.svg"> Back`;
            goBackButton.addEventListener("click", () => {
                n.playUIClick();
                promptDiv.remove();
                __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
            });
            promptDiv.appendChild(goBackButton);
            menuDiv.appendChild(promptDiv);
        }
        // pml pack screen ui
        );
        // pml pack screen ui
        _PolyPackBase_createPackScreen.set(this, (n) => {
            let menuDiv;
            for (const elem of document.getElementById("ui")?.children) {
                if (elem.classList.contains("menu")) {
                    menuDiv = elem;
                }
            }
            const hideList = [0, 1, 3, 4, 5, 6];
            for (const intToHide of hideList) {
                // @ts-ignore
                menuDiv.children[intToHide].classList.add("hidden");
            }
            let selectedPack;
            const packsDiv = document.createElement('div');
            packsDiv.className = "track-info";
            const availablePacksList = document.createElement("div");
            availablePacksList.className = "leaderboard";
            const availablePacksLabel = document.createElement("h2");
            availablePacksLabel.textContent = "Available";
            availablePacksList.appendChild(availablePacksLabel);
            const activatedPacksList = document.createElement("div");
            activatedPacksList.className = "leaderboard";
            const packActivatedLabel = document.createElement("h2");
            packActivatedLabel.textContent = "Loaded";
            activatedPacksList.appendChild(packActivatedLabel);
            const activatedPacksContainer = document.createElement("div");
            activatedPacksContainer.className = "container";
            activatedPacksList.appendChild(activatedPacksContainer);
            const buttonWrapper = document.createElement("div");
            buttonWrapper.className = "button-wapper";
            activatedPacksList.appendChild(buttonWrapper);
            const unloadButton = document.createElement('button');
            unloadButton.className = "button first";
            unloadButton.disabled = true;
            unloadButton.style = "margin: 10px 0; float: left;padding: 10px; margin-left:2px;";
            unloadButton.innerHTML = `<img class="button-icon" src="images/arrow_left.svg"> Unload`;
            unloadButton.addEventListener("click", () => {
                const pack = __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_getPack).call(this, selectedPack.id.replace("pack:", ""));
                __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_setPackLoaded).call(this, pack, false);
                packsDiv.remove();
                __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
            });
            buttonWrapper.appendChild(unloadButton);
            const goUpButton = document.createElement('button');
            goUpButton.className = "button first";
            goUpButton.disabled = true;
            goUpButton.style = "margin: 10px; float: left;padding: 10px";
            goUpButton.innerHTML = `<img class="button-icon" src="images/arrow_up.svg" style="margin: 0px 10px">`;
            goUpButton.addEventListener("click", () => {
                const pack = __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_getPack).call(this, selectedPack.id.replace("pack:", ""));
                __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_reorderPack).call(this, pack, -1);
                packsDiv.remove();
                __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
            });
            buttonWrapper.appendChild(goUpButton);
            const goDownButton = document.createElement('button');
            goDownButton.className = "button first";
            goDownButton.disabled = true;
            goDownButton.style = "margin: 10px 0; float: left;padding: 10px";
            goDownButton.innerHTML = `<img class="button-icon" src="images/arrow_down.svg" style="margin: 0px 10px">`;
            goDownButton.addEventListener("click", () => {
                // same thing
                const pack = __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_getPack).call(this, selectedPack.id.replace("pack:", ""));
                __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_reorderPack).call(this, pack, 1);
                packsDiv.remove();
                __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
            });
            buttonWrapper.appendChild(goDownButton);
            const applyButton = document.createElement('button');
            applyButton.className = "button first";
            applyButton.addEventListener("click", () => { n.playUIClick(); location.reload(); });
            applyButton.style = "margin: 10px 0; float: right;padding: 10px";
            applyButton.innerHTML = `Apply <img class="button-icon" src="images/checkmark.svg" style="margin: 0 5">`;
            buttonWrapper.appendChild(applyButton);
            const availableModsContainer = document.createElement("div");
            availableModsContainer.className = "container";
            availablePacksList.appendChild(availableModsContainer);
            for (const pack of __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_getAllPacks).call(this)) {
                const packDiv = document.createElement('div');
                packDiv.style = `--text-color: #fff;
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
                padding: 0;`;
                const packMainButton = document.createElement('button');
                packMainButton.id = `pack:${pack.packID}`;
                packMainButton.className = "button";
                packMainButton.style = `    --text-color: #fff;
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
                packMainButton.innerHTML = `<img src="${pack.iconSrc}" style="max-width:100px;max-height=100px;">`;
                packMainButton.addEventListener("click", () => {
                    if (!pack.loaded) {
                        goUpButton.disabled = true;
                        goDownButton.disabled = true;
                        unloadButton.disabled = true;
                        loadButton.disabled = false;
                        removeButton.disabled = false;
                    }
                    else {
                        removeButton.disabled = true;
                        unloadButton.disabled = false;
                        loadButton.disabled = true;
                        goUpButton.disabled = false;
                        goDownButton.disabled = false;
                        if (activatedPacksContainer.children[0] === packMainButton)
                            goUpButton.disabled = true;
                        if (activatedPacksContainer.children[activatedPacksContainer.children.length - 1] === packMainButton)
                            goDownButton.disabled = true;
                    }
                    if (selectedPack === packMainButton) {
                        goUpButton.disabled = true;
                        goDownButton.disabled = true;
                        unloadButton.disabled = true;
                        loadButton.disabled = true;
                        removeButton.disabled = true;
                        packMainButton.style = `    --text-color: #fff;
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
                        selectedPack = null;
                    }
                    else {
                        if (selectedPack) {
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
                        white-space: nowrap;`;
                        }
                        packMainButton.style = `    --text-color: #fff;
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
                        white-space: nowrap;`;
                        selectedPack = packMainButton;
                    }
                });
                const leftDiv = document.createElement("div");
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
                vertical-align: top;`;
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
                color: var(--text-color);">  ${pack.packName} </u></p><p style="    --text-color: #fff;
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
                color: var(--text-color);">  By ${pack.packAuthor}</p>`;
                const rightDiv = document.createElement("div");
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
                vertical-align: top;`;
                packMainButton.appendChild(leftDiv);
                packMainButton.appendChild(rightDiv);
                packDiv.appendChild(packMainButton);
                const infoButton = document.createElement("button");
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
                    __classPrivateFieldGet(this, _PolyPackBase_openDescription, "f").call(this, n, pack);
                });
                packDiv.appendChild(infoButton);
                if (pack.loaded)
                    activatedPacksContainer.appendChild(packDiv);
                else
                    availableModsContainer.appendChild(packDiv);
            }
            const backButtonWrapper = document.createElement("div");
            backButtonWrapper.className = "button-wapper";
            const backButton = document.createElement('button');
            backButton.className = "button back";
            backButton.style = "margin: 10px 0; float: left;padding: 10px";
            backButton.innerHTML = `<img class="button-icon" src="images/back.svg" style="margin: 0 5"> Back`;
            backButton.addEventListener("click", () => {
                n.playUIClick();
                for (const intToUnhide of hideList)
                    menuDiv.children[intToUnhide].classList.remove("hidden");
                packsDiv.remove();
            });
            backButtonWrapper.appendChild(backButton);
            const addButton = document.createElement('button');
            addButton.className = "button back";
            addButton.style = "margin: 10px 0; float: left;padding: 10px";
            addButton.innerHTML = `<img class="button-icon" src="images/load.svg" style="margin: 0 5"> Add`;
            addButton.addEventListener("click", () => {
                n.playUIClick();
                packsDiv.remove();
                __classPrivateFieldGet(this, _PolyPackBase_promptUserForNewPack, "f").call(this, n);
            });
            backButtonWrapper.appendChild(addButton);
            const removeButton = document.createElement('button');
            removeButton.className = "button back";
            removeButton.style = "margin: 10px 0; float: left;padding: 10px; margin-left: 0px;";
            removeButton.innerHTML = `<img class="button-icon" src="images/erase.svg" style="margin: 0 5"> Remove`;
            removeButton.addEventListener("click", () => {
                n.playUIClick();
                __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_removePack).call(this, __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_getPack).call(this, selectedPack.id.replace("pack:", "")));
                packsDiv.remove();
                __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
            });
            removeButton.disabled = true;
            backButtonWrapper.appendChild(removeButton);
            const loadButton = document.createElement('button');
            loadButton.className = "button first";
            loadButton.disabled = true;
            loadButton.style = "margin: 10px 0; float: right;padding: 10px; margin-right:2px;";
            loadButton.innerHTML = `Load <img class="button-icon" src="images/arrow_right.svg">`;
            loadButton.addEventListener("click", () => {
                const pack = __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_getPack).call(this, selectedPack.id.replace("pack:", ""));
                __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_setPackLoaded).call(this, pack, true);
                packsDiv.remove();
                __classPrivateFieldGet(this, _PolyPackBase_createPackScreen, "f").call(this, n);
            });
            backButtonWrapper.appendChild(loadButton);
            availablePacksList.appendChild(backButtonWrapper);
            packsDiv.appendChild(availablePacksList);
            packsDiv.appendChild(activatedPacksList);
            // @ts-ignore
            menuDiv.appendChild(packsDiv);
        });
    }
    /**
     * Register an asset folde to override.
     *
     * @param folder - The folder name in polytrack under which the files are overriden.
     */
    registerFolderOverride(folder, overrideFn) {
        __classPrivateFieldGet(this, _PolyPackBase_packOverrides, "f").push({
            folder: folder,
            overrideFn: overrideFn,
        });
        // hmm, ill be a bit more free after sunday so that works ig
    }
}
_PolyPackBase_pml = new WeakMap(), _PolyPackBase_localStorage = new WeakMap(), _PolyPackBase_polyVersion = new WeakMap(), _PolyPackBase_packs = new WeakMap(), _PolyPackBase_packUrls = new WeakMap(), _PolyPackBase_packOverrides = new WeakMap(), _PolyPackBase_openDescription = new WeakMap(), _PolyPackBase_promptUserForNewPack = new WeakMap(), _PolyPackBase_createPackScreen = new WeakMap(), _PolyPackBase_instances = new WeakSet(), _PolyPackBase_getPack = function _PolyPackBase_getPack(id) {
    for (const pack of __classPrivateFieldGet(this, _PolyPackBase_packs, "f")) {
        if (pack.packID === id)
            return pack;
    }
}, _PolyPackBase_getAllPacks = function _PolyPackBase_getAllPacks() {
    return __classPrivateFieldGet(this, _PolyPackBase_packs, "f");
}, _PolyPackBase_addPack = async function _PolyPackBase_addPack(polyPackURL) {
    try {
        const manifest = await fetch(`${polyPackURL}/manifest.json`).then(r => r.json());
        const pack = manifest.polypack;
        if (pack.targets.indexOf(__classPrivateFieldGet(this, _PolyPackBase_polyVersion, "f")) === -1) {
            alert(`Polypack ${pack.name} does not support current version.`);
            return;
        }
        __classPrivateFieldGet(this, _PolyPackBase_packs, "f").push({
            packName: pack.name,
            packID: pack.id,
            packAuthor: pack.author,
            assetFolder: "assets",
            iconSrc: "icon.png",
            loaded: false,
        });
    }
    catch (err) {
        alert("Could not import PolyPack, check console for errors and report them to the pack creator");
        console.error("Error in getting importing Polypadk: ", err);
    }
    __classPrivateFieldGet(this, _PolyPackBase_packUrls, "f").push({
        base: polyPackURL,
        loaded: false,
    });
    __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_savePacksToLocalStorage).call(this);
}, _PolyPackBase_removePack = function _PolyPackBase_removePack(pack) {
    if (!pack)
        return;
    const index = __classPrivateFieldGet(this, _PolyPackBase_packs, "f").indexOf(pack);
    if (index > -1) {
        __classPrivateFieldGet(this, _PolyPackBase_packs, "f").splice(index, 1);
    }
    __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_savePacksToLocalStorage).call(this);
}, _PolyPackBase_savePacksToLocalStorage = function _PolyPackBase_savePacksToLocalStorage() {
    if (__classPrivateFieldGet(this, _PolyPackBase_packUrls, "f").length === 0) {
        __classPrivateFieldSet(this, _PolyPackBase_packUrls, [{
                base: "",
                loaded: true,
            }], "f");
    }
    __classPrivateFieldGet(this, _PolyPackBase_localStorage, "f").setItem("polypacks", JSON.stringify(__classPrivateFieldGet(this, _PolyPackBase_packUrls, "f")));
}, _PolyPackBase_importPacks = async function _PolyPackBase_importPacks() {
    for (let packURL of __classPrivateFieldGet(this, _PolyPackBase_packUrls, "f")) {
        try {
            const manifestFile = await fetch(`${packURL.base}/manifest.json`).then(r => r.json());
            let pack = manifestFile.polypack;
            try {
                if (__classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_getPack).call(this, pack.id)) {
                    alert(`Duplicate PolyPack detected: ${pack.name}`);
                    return;
                }
                __classPrivateFieldGet(this, _PolyPackBase_packs, "f").push({
                    packName: pack.name,
                    packID: pack.id,
                    packAuthor: pack.author,
                    assetFolder: "assets",
                    iconSrc: "icon.png",
                    loaded: packURL.loaded,
                });
            }
            catch (err) {
                alert(`Mod ${pack.name} failed to load.`);
                console.error("Error in loading pack: ", err);
            }
        }
        catch (err) {
            alert(`Couldn't load polypack with URL ${packURL.base}.`);
            console.error("Error in loading pack URL:", err);
        }
    }
}, _PolyPackBase_setPackLoaded = function _PolyPackBase_setPackLoaded(pack, state) {
    if (!pack)
        return;
    pack.loaded = state;
    __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_savePacksToLocalStorage).call(this);
}, _PolyPackBase_reorderPack = function _PolyPackBase_reorderPack(pack, delta) {
    if (!pack)
        return;
    const currentIndex = __classPrivateFieldGet(this, _PolyPackBase_packs, "f").indexOf(pack);
    if ((currentIndex === 1) || delta > 0)
        return;
    if (currentIndex === null || currentIndex === undefined) {
        alert("This pack isn't loaded");
        return;
    }
    const temp = __classPrivateFieldGet(this, _PolyPackBase_packs, "f")[currentIndex + delta];
    __classPrivateFieldGet(this, _PolyPackBase_packs, "f")[currentIndex + delta] = __classPrivateFieldGet(this, _PolyPackBase_packs, "f")[currentIndex];
    __classPrivateFieldGet(this, _PolyPackBase_packs, "f")[currentIndex] = temp;
    __classPrivateFieldGet(this, _PolyPackBase_instances, "m", _PolyPackBase_savePacksToLocalStorage).call(this);
};
exports.polyMod = new PolyPackBase();
