import { promises as fs } from 'fs'

export const isExist = async (path) => {
    try {
        await fs.access(path)
        return true
    } catch {
        return false
    }
}
