import readline from 'readline'
import core from 'os'
import { sep } from 'path'
import { cd, ls, cat, add, rn, cp, rm, os, calculateHash, decompress, compress } from './scripts/index.js'
import { handleExit } from './utils/handleExit.js'

const __username = process.argv[2].slice(11) || 'Anonymous'
const __startPath = core.homedir() // C:\Users\User

let currentDirArray = __startPath.split(sep)

const withLog = async (fn, args) => {
    await fn(args)
    console.log(`You are currently in ${currentDirArray.join(sep)}`)
}

const up = () => currentDirArray.length > 1 && currentDirArray.pop()
const handleCd = async (args) => {
    let result = await cd(args[0], currentDirArray)
    if (result) currentDirArray = result
}

const handleLs = async () => await ls(currentDirArray.join(sep))
const handleCat = async (args) => {
    let result = await cd(args[0], currentDirArray)
    if (result) await cat(result.join(sep))
}
const handleAdd = async (args) => await add(currentDirArray.join(sep) + sep + args[0])
const handleRn = async (args) => {
    let result = await cd(args[0], currentDirArray)
    if (result) await rn(result, args[1])
}
const handleCp = async ({ shouldDeleteFile = false, args }) => {
    let oldPath = await cd(args[0], currentDirArray)
    let newPath = await cd(args[1], currentDirArray, false)
    if (oldPath) await cp(oldPath.join(sep), newPath, shouldDeleteFile)
}
const handleRm = async (args) => {
    let result = await cd(args[0], currentDirArray)
    await rm(result.join(sep))
}
const handleCalculateHash = async (args) => {
    let result = await cd(args[0], currentDirArray)
    await calculateHash(result.join(sep))
}
const handleCompress = async (args) => {
    let srcPath = await cd(args[0], currentDirArray)
    let destPath = await cd(args[1], currentDirArray, false)
    if (srcPath) await compress(srcPath.join(sep), destPath)
}
const handleDecompress = async (args) => {
    let srcPath = await cd(args[0], currentDirArray)
    let destPath = await cd(args[1], currentDirArray, false)
    if (srcPath) await decompress(srcPath.join(sep), destPath)
}

const start = () => {
    const rl = readline.createInterface(process.stdin, process.stdout)
    console.log(`Welcome to the File Manager, ${__username}!`)
    console.log(`You are currently in ${__startPath}`)

    rl.on('line', (input) => {
        const [command, ...args] = input.split(' ')
        switch (command) {
            case 'up': return withLog(up)
            case 'cd': return withLog(handleCd, args)
            case 'ls': return withLog(handleLs)
            case 'cat': return withLog(handleCat, args)
            case 'add': return withLog(handleAdd, args)
            case 'rn': return withLog(handleRn, args)
            case 'cp': return withLog(handleCp, { args })
            case 'mv': return withLog(handleCp, { shouldDeleteFile: true, args })
            case 'rm': return withLog(handleRm, args)
            case 'os': return withLog(os, args[0])
            case 'hash': return withLog(handleCalculateHash, args)
            case 'compress': return withLog(handleCompress, args)
            case 'decompress': return withLog(handleDecompress, args)
            case '.exit': return handleExit()

            default: console.error('Invalid input')
        }
    });

    rl.on('SIGINT', handleExit)
}

start()
