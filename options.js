import jsonHandler from "./jsonHandler.js"

/**
 * Options
 * @typedef {Object} Settings
 * @property {number} timeOffSet
 */

/** @type {Options} */

class Options {
    constructor() {}
    get constants() {
        const dataDir = "./data"
        const persistentDataDir = `${dataDir}/persistent`
        const settingsFile = `${persistentDataDir}/settings.json`
        const defaultSettingsFile = `${dataDir}/defaultSettings.json`
        return {dataDir, persistentDataDir, settingsFile, defaultSettingsFile}
    }

    /** @returns {Settings} */
    async settings() {
        return await jsonHandler.read(this.constants.settingsFile) ?? await jsonHandler.read(this.constants.defaultSettingsFile)
    }
}



// let storedOptions = null
// let options = {}
// options = {
//     /** @returns {Options} */
//     options: async () => {
//         if (options != null) { return storedOptions }
//         storedOptions = await jsonHandler.read()
//     },
//     constants: {
//         persistentDataDir: "./data/persistent",
//         optionsFile: `${options.constants.persistentDataDir}`
//     }
// }

export default new Options()