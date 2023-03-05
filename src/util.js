export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const addressFormatter = (address) => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 3, address.length)
}

export const TOKEN_TOKEN_EDUCATION = 1
export const TOKEN_TOKEN_EXPERIENCE = 2
export const TOKEN_TOKEN_CERTIFICATION = 3