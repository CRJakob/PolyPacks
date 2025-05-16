var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PolyPacks_pml, _PolyPacks_modList;
// @ts-ignore
import { importPolyMod } from "https://pml.orangy.cfd/CRJakob/PolyPacks/dev/modpackTools.js";
// @ts-ignore
import { PolyMod } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
class PolyPacks extends PolyMod {
    constructor() {
        super(...arguments);
        // Mod specific stuff
        _PolyPacks_pml.set(this, void 0);
        _PolyPacks_modList.set(this, []);
        this.init = (pmlInstance) => {
            __classPrivateFieldSet(this, _PolyPacks_pml, pmlInstance, "f");
            __classPrivateFieldSet(this, _PolyPacks_modList, [
                {
                    url: "https://pml.orangy.cfd/CRJakob/PolyPacks/dev/PolyPack",
                    version: "latest"
                },
                {
                    url: "https://pml.orangy.cfd/CRJakob/PolyPacks/dev/ImagePack",
                    version: "latest"
                }
            ], "f");
            __classPrivateFieldGet(this, _PolyPacks_modList, "f").forEach(({ url, version }) => {
                importPolyMod({ url, version });
            });
        };
    }
}
_PolyPacks_pml = new WeakMap(), _PolyPacks_modList = new WeakMap();
export const polyMod = new PolyPacks();
