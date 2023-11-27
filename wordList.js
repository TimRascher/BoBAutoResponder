import jsonHandler from "./jsonHandler.js"

/**
 * @typedef {Object} WordList
 * @property {string[]} list - An array of strings.
 */

/**
 * Represents the word of the day.
 * @typedef {Object} WordOfTheDay
 * @property {string} date - The date in YYYY/MM/DD format.
 * @property {string} word - The selected word for the day.
 * @property {boolean} wasFound
 */

/**
 * @typedef {Object} Today
 * @property {boolean} isNew
 * @property {WordOfTheDay} today
 */

const wordListFile = "./data/wordList.json"
const wordOfTheDayFile = "./data/wordOfTheDay.json"

/** @returns {string} */
const randomWord = async () => {
    const words = await wordList()
    if (words.list && words.list.length) {
        const randomIndex = Math.floor(Math.random() * words.list.length)
        return words.list[randomIndex].toLowerCase()
    }
    return "blamo"
}
/** @returns {string} */
const todaysDate = () => {
    const today = new Date()
    return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
}
/** @returns {WordList} */
const wordList = async () => {
    /** @type {WordList} */
    const list = await jsonHandler.read(wordListFile) ?? { list: "blamo" }
    return list
}
/** @returns {Today} */
const todaysWord = async () => {
    /** @type {WordOfTheDay} */
    let today = await jsonHandler.read(wordOfTheDayFile)
    let date = todaysDate()
    if (today && today.date == date) { return { isNew: false, today: today } }
    today = { date: date, word: await randomWord(), wasFound: false }
    await jsonHandler.write(wordOfTheDayFile, today)
    return { isNew: true, today: today }
}
const hasBeenFound = async () => {
    /** @type {WordOfTheDay} */
    var today = await jsonHandler.read(wordOfTheDayFile)
    if (today) {
        today.wasFound = true
    }
    await jsonHandler.write(wordOfTheDayFile, today)
}

export default {
    list: wordList,
    today: todaysWord,
    hasBeenFound: hasBeenFound
}