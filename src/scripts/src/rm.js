import { promises as fs } from 'fs'

export const rm = async (path) => {
    try {
        await fs.unlink(path)
    } catch {
        console.error('operation failed')
    }
};
