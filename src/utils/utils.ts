export function priceFormat(value: number):string {
    return `${value}$`
}

export function formatDate(value: string):string {
    return new Date(value).toDateString();
}