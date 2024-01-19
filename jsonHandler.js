import fs from "fs"
import path from "path"

const jsonHandler = {
    /**
     * @param {string} filePath 
     * @returns {object}
     */
    read: async (filePath) => {
        return new Promise((res, rej) => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    res(null)
                    return
                }
                fs.readFile(filePath, (err, rawData) => {
                    if (err) { rej(err) }
                    const data = JSON.parse(rawData)
                    // console.log(data)
                    res(data)
                })
            })
        })
    },
    /**
     * @param {string} filePath
     * @param {object?} obj
     */
    write: async (filePath, obj) => {
        return new Promise((res, rej) => {
            const data = JSON.stringify(obj)
            fs.writeFile(filePath, data, 'utf8', function (err) {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        })
    },
    /**
    * @param {string} sourcePath - The path to the source file.
    * @param {string} destPath - The path to the destination directory.
    */
    copyFileIfNotExists: async (sourcePath, destPath) => {
        return new Promise((res, rej) => {
            const fileName = path.basename(sourcePath)
            const fullDestPath = path.join(destPath, fileName)
            if (fs.existsSync(fullDestPath)) {
                return
            }

            fs.copyFile(sourcePath, fullDestPath, (err) => {
                if (err) {
                    rej(err)
                    return
                }
                res()
            })
        })
    }
}

export default jsonHandler