import { FC, useState, useEffect } from "react";

interface PhoneInputProps {
    phone?: string
    setPhone?: (string: string) => void
    label: string
    placeholder?: string
}

const format = (value: string) => {
    const phone = value.replace(/[^\d]/g, "")

    if(phone.length < 4) {
        return phone
    }

    if(phone.length < 7) {
        return phone.slice(0, 3) + " " + phone.slice(3)
    }

    return phone.slice(0, 3) + " " + phone.slice(3, 6) + " " + phone.slice(6, 10)
}

export const PhoneInput: FC<PhoneInputProps> = ({phone, setPhone, label, placeholder = label}) => {
    const [value, setValue] = useState("")

    useEffect(() => {
        if(phone && phone?.length > 0) {
            setValue(phone)
        }
    }, [])

    useEffect(() => {
        setPhone && setPhone(value)
    }, [value])

    return (
        <div className="">
            <label className="block text-gray-500 mb-3">
                {label}
            </label>
            <input 
                className="border rounded-sm py-1 px-3 outline-none bg-slate-100 block mb-3 text-gray-500 w-full"
                value={value}
                placeholder={placeholder}
                onChange={e => setValue(format(e.target.value))}/>
        </div>
    )
}