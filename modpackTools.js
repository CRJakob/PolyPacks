"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
exports.importPolyMod = importPolyMod;
exports.isElectron = isElectron;
// function to detect if running on app version
function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }
    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }
    // Detect the user agent when the `nodeIntegration` option is set to false
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }
    return false;
}
// normalize url function
function normalize(u) {
    return new URL(u).href.replace(/\/+$/, "");
}
function importPolyMod(pml, _a) {
    var modurl = _a.url, modversion = _a.version;
    console.info("\u23F3 Attempting to import mod: ".concat(modurl, "@").concat(modversion));
    // get polyMods object
    var raw = pml.getAllMods().toString();
    // normalize url
    var normUrl = normalize(modurl);
    // avoid duplicate mod error
    if (raw.includes(normUrl)) {
        // skip
        console.warn("\u26A0\uFE0F  Skipping import; already in polyMods: ".concat(modurl));
    }
    // import mod if not already present
    else {
        // import mod
        pml.addMod({ base: modurl, version: modversion, loaded: true })
            .then(function (mod) {
            window.PolyModLoader.setModLoaded(mod, true);
            console.info("\u2705 Successfully imported: ".concat(modurl));
        })
            .catch(function (err) {
            console.error("\u274C Failed to import ".concat(modurl, ": "), err);
        });
    }
}
