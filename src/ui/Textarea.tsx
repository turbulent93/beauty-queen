import { FC, forwardRef } from "react";

interface TextareaProps {
    label?: string
    placeholder?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({label, ...rest}, ref) => {
    return (
        <div>
            {
                label && (
                    <label
                        className="mr-2 text-gray-500 whitespace-nowrap"
                        >{label}</label>
                )
            }
            <textarea 
                className="border rounded-sm py-1 px-3 outline-none bg-slate-100 h-24 w-full overflow-y-hidden mt-2" 
                ref={ref}
                {...rest}
                />
        </div>
    )
})