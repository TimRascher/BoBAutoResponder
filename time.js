import options from "./options.js"

class Time {
    constructor() {}
    async date() {
        let settings = await options.settings()
        // const now = new Date()
        let now = new Date()
        console.log(now)
        now = new Date(now.getTime() + (settings.timeOffSet * 60 * 60 * 1000))
        console.log(now)
        const timeOptions = { timeZone: 'America/Los_Angeles' }
        const getPart = (type, removeType) => {
            if (removeType) { delete timeOptions[removeType] }
            timeOptions[type] = "numeric"
            return new Intl.DateTimeFormat('en-US', timeOptions).format(now)
        }
        const year = getPart("year")
        const month = getPart("month", "year")
        const day = getPart("day", "month")
        return `${year}/${month}/${day}`
    }
}

export default new Time()