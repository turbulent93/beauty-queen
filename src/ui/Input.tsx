import clsx from "clsx";
import { forwardRef, useState } from "react";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx"

interface InputProps {
    label?: string
    placeholder: string
    type?: string
    orientation?: "vertical" | "horizontal"
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({label, placeholder, type = "text", orientation = "vertical", ...rest}, ref) => {
    const [close, setClose] = useState(false)
    const [inputType, setInputType] = useState(type)

    const handler = () => {
        setClose(!close)
        setInputType(inputType == "text" ? "password" : "text")
    }

    return (
        <div className={clsx("flex relative w-full", orientation == "vertical" ? "flex-col mb-4" : "items-end")}>
            {
                label && (
                    <label
                        className="mr-2 mb-2 text-gray-500 whitespace-nowrap"
                        >{label}</label>
                )
            }
            <input 
                className="border rounded-sm py-1 px-3 outline-none bg-slate-100 w-full"
                ref={ref}
                placeholder={placeholder}
                type={inputType}
                {...rest}
                />
                {
                    type == "password" &&
                    (close ?
                    <RxEyeOpen 
                        className="absolute right-4 top-10 text-[20px] text-gray-600 cursor-pointer"
                        onClick={handler}/> :
                    <RxEyeClosed 
                        className="absolute right-4 top-10 text-[20px] text-gray-600 cursor-pointer"
                        onClick={handler}/>)
                }
        </div>
    )
})