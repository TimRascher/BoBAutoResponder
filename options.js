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
        const wordList = `${dataDir}/wordList.json`
        const wordOfTheDay = `${persistentDataDir}/wordOfTheDay.json`
        return {dataDir, persistentDataDir, settingsFile, defaultSettingsFile, wordList, wordOfTheDay}
    }

    /** @returns {Settings} */
    async settings() {
        return await jsonHandler.read(this.constants.settingsFile) ?? await jsonHandler.read(this.constants.defaultSettingsFile)
    }
}

export default new Options()