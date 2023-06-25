import { promises as fs } from 'fs'
import { sep } from 'path'

export const rn = async (pathToFile, newName) => {
    console.log(pathToFile)
    const newPath = pathToFile.slice(0, -1).join(sep) + sep + newName
    console.log(newPath)
    try {
        await fs.rename(pathToFile.join(sep), newPath)
    } catch (e) {
        console.error('FS operation failed')
    }
};
