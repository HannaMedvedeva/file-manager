import { createReadStream } from 'fs'

export const cat = async (path) => {
    const readableStream = createReadStream(path);

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk)
    })
    readableStream.on('end', () => {
        process.stdout.write('\n')
    });
};
