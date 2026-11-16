export const getTotalPrice = (price: number, discount: number, quanity: number) => {
    return ((price * (1 - discount / 100)) * quanity).toFixed(2)
}