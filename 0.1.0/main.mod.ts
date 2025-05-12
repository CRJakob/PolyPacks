import { PolyMod, PolyModLoader } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
class ErrorPopupMod extends PolyMod {
    constructor() {
        this.init = (pmlInstance) => {
            this.pml=pmlInstance