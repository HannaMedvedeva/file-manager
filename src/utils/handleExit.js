const __username = process.argv[2].slice(11)

export const handleExit = () => {
    console.log(`Thank you for using File Manager, ${__username}, goodbye!`)
    process.exit(0)
}
