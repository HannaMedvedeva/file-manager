import core from 'os'

export const os = (arg) => {
    switch (arg) {
        case '--EOL': return console.log(JSON.stringify(core.EOL))
        case '--cpus': return console.log(core.cpus())
        case '--homedir': return console.log(core.homedir())
        case '--username': return console.log(core.userInfo().username)
        case '--architecture': return console.log(core.arch())
        default: console.error('Invalid input')
    }
}
