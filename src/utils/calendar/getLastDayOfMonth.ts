export const getLastDateOfMonth = (year: number, month: number) => {
    const date = new Date(year, month + 1, 0)

    return date.getDate()
}