export const getFileExtension = (fileName: string) => {
    const splitted = fileName.split(".")
    return splitted[splitted.length - 1]
}