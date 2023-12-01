import clsx from "clsx";
import { forwardRef, useState } from "react";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx"
import { Field } from "./Field";

interface PasswordInputProps {
    label?: string
    placeholder: string
    error?: boolean
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({label, placeholder, error, ...rest}, ref) => {
    const [close, setClose] = useState(true)

    const handler = () => {
        setClose(!close)
    }

    return (
        <div className={clsx("flex relative w-full flex-col mb-4")}>
            <Field error={error} label={label}>
                <input 
                    className={clsx("bg-inherit outline-none w-full",
                        error ? "placeholder:text-red-300" : "placeholder:text-gray-400"
                    )}
                    ref={ref}
                    placeholder={placeholder}
                    type={close ? "password" : "text"}
                    {...rest}
                    />
            </Field>
            {
                close ?
                    <RxEyeClosed 
                        className="absolute right-4 top-10 text-[20px] text-gray-600 cursor-pointer"
                        onClick={handler}/> :
                    <RxEyeOpen 
                        className="absolute right-4 top-10 text-[20px] text-gray-600 cursor-pointer"
                        onClick={handler}/>
            }
            
        </div>
    )
})