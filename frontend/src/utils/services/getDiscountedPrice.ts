export const getDiscountedPrice = (price: number, discount?: number, unit?: string) => {
    return discount ?
        (
            unit == "р" ? 
                price - discount + " (-" + discount + "р)" :
                price - Math.ceil(price / 100 * discount) + " (-" + discount + "%)"
        ) :
        price + "р"
}