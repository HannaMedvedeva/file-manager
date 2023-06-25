import { createReadStream, createWriteStream, mkdir } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { createBrotliDecompress } from 'zlib'
import { sep } from 'path'

export const decompress = async (srcPath, destPath) => {
    const pathWithoutFile = destPath.slice(0, -1)
    if (pathWithoutFile) {
        mkdir(pathWithoutFile.join(sep), { recursive: true }, () => 'operation failed')
    }
    const readable = createReadStream(srcPath)
    const writable = createWriteStream(destPath.join(sep))
    const brotli = createBrotliDecompress();

    const pipe = promisify(pipeline)

    try {
        await pipe(readable, brotli, writable)
    } catch {
        console.error('operation failed')
    }
};
