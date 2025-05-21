import {PolyModLoader} from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
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


function importPolyMod({ url: modurl, version: modversion }) {
    console.info(`⏳ Attempting to import mod: ${modurl}@${modversion}`);

    // get polyMods object
    const raw = pml.getAllMods().toString();

    // normalize url
    const normUrl = normalize(modurl);

    // avoid duplicate mod error
    if (raw.includes(normUrl)) {
        // skip
        console.warn(`⚠️  Skipping import; already in polyMods: ${modurl}`);
    }
    // import mod if not already present
    else {
        // import mod
        pml.addMod({ base: modurl, version: modversion, loaded: true })
        .then(mod => {
            window.PolyModLoader.setModLoaded(mod, true);
            console.info(`✅ Successfully imported: ${modurl}`);
        })
        .catch(err => {
            console.error(`❌ Failed to import ${modurl}: `, err);
        });
    }
}

export { normalize, importPolyMod, isElectron };