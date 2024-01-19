import express from "express"
import options from "./options.js"
import jsonHandler from "./jsonHandler.js"

class API {
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use("/", express.static("./html"))
        this.app.get("/settings", async (req, res) => {
            let settings = await options.settings()
            res.send(settings)
        })
        this.app.post("/settings", async (req, res) => {
            let settings = this.validate(req.body)
            if (settings == null) {
                res.status(400).send({error: "Data Invalid"})
                return
            }
            await jsonHandler.write(options.constants.settingsFile, settings)
            res.status(200).send({error: null})
        })
    }
    start() {
        this.app.listen(3000)
    }
    /** @private */
    validate(settings) {
        if (Object.keys.length > 1) { return null }
        if (typeof settings.timeOffSet !== "number"
            || isNaN(settings.timeOffSet) 
            || settings.timeOffSet < 0
            || settings.timeOffSet > 24) {
                return null
            }
        return settings
    }
}



// const app = express()
// app.use("/", express.static("./html"))

// const api = () => {
//     app.listen(3000)
// }
export default new API