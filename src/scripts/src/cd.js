import { sep, isAbsolute } from 'path'
import { isExist } from '../../utils/IsExist.js'

const sep_regexp = /\\|\//

export const cd = async (path, currentDirArray, checkIfExist = true) => {
    if (!path || typeof path !== 'string') return console.error('Invalid input')
    if (isAbsolute(path)) {
        if (checkIfExist && !await isExist(path)) return console.error('Invalid input')
        return path.split(sep_regexp)
    } else {
        let newPath = [...currentDirArray]
        path.split(sep_regexp).forEach((el) => {
            if (el === '.') return
            if (el === '..') {
                newPath.pop()
            } else {
                newPath.push(el)
            }
        })
        const trimmedPath = newPath.filter(Boolean)
        if (checkIfExist && !await isExist(trimmedPath.join(sep))) return console.error('Invalid input')
        return trimmedPath
    }
}
