import { FC, useState, useEffect } from "react";

interface PhoneInputProps {
    percent: number
    setPercent?: (string?: number) => void
    label: string
    placeholder?: string
}

const format = (value: string) => {
    if(Number(value) < 0) {
        return 0
    }

    if(Number(value) > 100) {
        return 100
    }

    return Number(value)
}

export const PercentInput: FC<PhoneInputProps> = ({percent, setPercent, label, placeholder = label}) => {
    const [value, setValue] = useState<number>(0)

    useEffect(() => {
        if(percent) {
            setValue(percent)
        }
    }, [])

    useEffect(() => {
        setPercent && setPercent(value)
    }, [value])

    return (
        <div className="">
            <label className="block text-gray-500 mb-3">
                {label}
            </label>
            <input 
                className="border rounded-sm py-1 px-3 outline-none bg-slate-100 block mb-3 text-gray-500 w-full"
                value={value}
                type="number"
                placeholder={placeholder}
                onChange={e => setValue(format(e.target.value))}/>
        </div>
    )
}