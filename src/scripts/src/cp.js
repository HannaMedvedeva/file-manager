import { createWriteStream, createReadStream, mkdir } from 'fs'
import { pipeline } from 'stream';
import { sep } from 'path'
import { rm } from './rm.js'

export const cp = async (oldPath, newPath, shouldDeleteFile) => {
    const pathWithoutFile = newPath.slice(0, -1)
    if (pathWithoutFile) {
        mkdir(pathWithoutFile.join(sep), { recursive: true }, () => 'operation failed')
    }
    const readable = createReadStream(oldPath)
    const writable = createWriteStream(newPath.join(sep))
    pipeline(readable, writable, (err) => {
        if (err) {
            console.error('operation failed', err)
        } else if (shouldDeleteFile) rm(oldPath)
    })
};
