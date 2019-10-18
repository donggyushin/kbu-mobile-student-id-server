export const generateRandomNumber = (): string => {
    const number: string = Math.floor(1000 + Math.random() * 9000).toString();
    return number
}