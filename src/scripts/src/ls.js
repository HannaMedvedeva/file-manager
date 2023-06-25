import { promises as fs } from 'fs'
import { isExist } from '../../utils/IsExist.js'

export const ls = async (currentDirArray) => {
    console.log(currentDirArray)
    if (!await isExist(currentDirArray)) return console.error('operation failed')

    try {
        console.log(currentDirArray)
        const files = await fs.readdir(currentDirArray, { withFileTypes: true })
        const tableContent = files.map((file) => {
            return { 'Name': file.name, 'Type': file.isFile() ? 'file' : 'directory' }
        })
        console.table(tableContent);
    } catch {
        console.error('operation failed')
    }
};
