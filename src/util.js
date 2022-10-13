
export const addressFormatter = (address) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 3, address.length)
}