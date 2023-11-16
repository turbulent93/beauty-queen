export const phoneMask = (value: string) => {
    const phone = value.replace(/^8|[^_^\d]/g, "")
    
    if(phone.length == 0) {
        return ""
    }

    if(phone.length < 4) {
        return "8 (" + phone
    }

    if(phone.length < 7) {
        return "8 (" + phone.slice(0, 3) + ") " + phone.slice(3)
    }

    return "8 (" + phone.slice(0, 3) + ") " + phone.slice(3, 6) + "-" + phone.slice(6, 10)
}