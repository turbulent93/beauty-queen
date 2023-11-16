import { FC, useState, useEffect } from "react";

interface PhoneInputProps {
    percent: number
    setPercent?: (string?: number) => void
    label: string
    placeholder?: string
    className?: string
    toPercent?: boolean
}

const format = (value: string, toPercent: boolean): string => {
    const number = value.replace(/^0+/, "")

    if(!toPercent) {
        return number
    }

    if(Number(number) < 0) {
        return "0"
    }

    if(Number(number) > 100) {
        return "100"
    }

    return number
}

export const NumberInput: FC<PhoneInputProps> = ({percent, setPercent, label, placeholder = label, className, toPercent = false}) => {
    const [value, setValue] = useState<string>("0")

    useEffect(() => {
        if(percent) {
            setValue(percent.toString())
        }
    }, [])

    useEffect(() => {
        setPercent && setPercent(Number(value))
    }, [value])

    return (
        <div className={className}>
            <label className="block text-gray-500 mb-3">
                {label}
            </label>
            <input 
                className="border rounded-sm py-1 px-3 outline-none bg-slate-100 block mb-3 text-gray-500 w-full"
                value={value}
                type="number"
                placeholder={placeholder}
                onChange={e => setValue(format(e.target.value, toPercent))}/>
        </div>
    )
}