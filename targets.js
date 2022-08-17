
export default (() => {
    const itemsRaw = process.env.IDS
    const items = itemsRaw.split(",")
    let ids = {}
    items.forEach((item) => {
        const keyPair = item.split("-")
        ids[keyPair[0]] = keyPair[1]
    })
    return ids
})()