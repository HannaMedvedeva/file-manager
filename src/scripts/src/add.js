import { promises as fs } from 'fs'

export const add = async (path) => {
    try {
        await fs.appendFile(path, '')
    } catch (e) {
        console.log(e)
        console.error('operation failed')
    }
};
