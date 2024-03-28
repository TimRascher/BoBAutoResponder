async function createRoles(client, targets) {
    const guild = await client.guilds.fetch(process.env.GUILDID)
    if (!guild) { console.log("Guild Not Found!"); return; }
    async function findRole(name, reason) {
        let role = guild.roles.cache.find(r => r.name === name)
        if (!role) {
            try {
                role = await guild.roles.create({
                    name: name,
                    reason: reason,
                })
                console.log(`Created new role with name ${name}`)
            } catch (error) {
                console.error('Error creating role:', error)
            }
        }
        return role
    }
    targets.OptIn = await findRole("BoBOptIn", "Have fun participating with the BoB Auto Responder!")
    targets.OptOut = await findRole("BoBOptOut", "No longer suffer the whims of the BoB Auto Responder, perchance!")
}
async function setRoles(client, targets) {    
    const guild = await client.guilds.fetch(process.env.GUILDID)
    if (!guild) { console.log("Guild Not Found!"); return; }
    guild.members.fetch().then(members => {
        members.forEach(member => {
            if (member.user.bot) { return }
            if (!member.roles.cache.has(targets.OptIn.id)) {
                if (!member.roles.cache.has(targets.OptOut.id)) {
                    member.roles.add(targets.OptIn.id).catch(console.error)
                }
            }
        })
    }).catch(console.error)
}

export { createRoles, setRoles }