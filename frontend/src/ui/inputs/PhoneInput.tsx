import { phoneMask } from "@/utils/masks/phoneMask";
import { FC } from "react";
import { Field } from "./Field";

interface PhoneInputProps {
    phone?: string
    setPhone: (string: string) => void
    label: string
    placeholder?: string
    error?: boolean
}

export const PhoneInput: FC<PhoneInputProps> = ({phone, setPhone, label, placeholder = label, error}) => {
    return (
        <Field label={label} error={error}>
            <input 
                className="bg-inherit outline-none w-full placeholder:text-gray-400"
                value={phone || ""}
                placeholder={placeholder}
                onChange={e => setPhone(phoneMask(e.target.value))}/>
        </Field>
    )
}