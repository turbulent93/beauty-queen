import clsx from "clsx";
import { forwardRef } from "react";
import { Field } from "./Field";

interface InputProps {
    label?: string
    placeholder: string
    type?: string
    error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({label, placeholder, type = "text", error, ...rest}, ref) => {
    return (
        <Field error={error} label={label}>
            <input 
                className={clsx("bg-inherit outline-none w-full",
                    // error ? "placeholder:text-red-300" : 
                    "placeholder:text-gray-400"
                )}
                ref={ref}
                placeholder={placeholder}
                {...rest}
                />
        </Field>            
    )
})