import crypto from 'crypto'
import { promises as fs } from 'fs'

export const calculateHash = async (path) => {
    const text = await fs.readFile(path)
    console.log(crypto.createHash('sha256').update(text).digest('hex'))
};
