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
var _ImagePack_pml, _ImagePack_polypack;
// @ts-ignore
import { PolyMod } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
// IMPORTANT NOTE TO ME: COMMENT OUT BELOW LINES BEFORE PUSHING
// import { PolyMod, PolyModLoader } from "../../PolyModLoader/PolyModLoader.ts";
// import { PolyPackBase } from "../../PolyPack/0.1.0/main.mod.ts";
class ImagePack extends PolyMod {
    constructor() {
        super(...arguments);
        // Mod specific stuff
        _ImagePack_pml.set(this, void 0);
        _ImagePack_polypack.set(this, void 0);
        this.init = (pmlInstance) => {
            __classPrivateFieldSet(this, _ImagePack_pml, pmlInstance, "f");
            // @ts-ignore
            __classPrivateFieldSet(this, _ImagePack_polypack, __classPrivateFieldGet(this, _ImagePack_pml, "f").getMod("polypacks"), "f");
        };
    }
}
_ImagePack_pml = new WeakMap(), _ImagePack_polypack = new WeakMap();
export const polyMod = new ImagePack();
