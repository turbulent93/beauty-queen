import { Calendar, ICalendarValue } from "@/components/calendar/Calendar";
import { Modal } from "@/components/Modal";
import clsx from "clsx";
import { FC, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Field } from "./Field";

type DateInputProps = {
    value?: ICalendarValue
    onChange: (date?: ICalendarValue) => void
    label?: string
    startDate?: string
    endDate?: string
    disabled?: boolean
    halving?: boolean
    className?: string
    error?: boolean
}

export const DateInput: FC<DateInputProps> = (
    {label, value, onChange, startDate, endDate, disabled, halving = true, className, error}
) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(isOpen) 
            setIsOpen(!isOpen)
    }, [value])

    return (
        <div className={className}>
            <Field label={label} error={error}>
                <div 
                    // className={clsx("w-full flex items-center justify-between gap-3 px-4", halving && "min-[360px]:w-1/2", error)}
                    className={clsx("flex items-center justify-between w-full")}
                    onClick={() => setIsOpen(!isOpen)}
                    // disabled={disabled}
                > 
                    {
                        value?.date || "Выбрать дату"
                    }                
                    <div>
                        <AiOutlineClose
                            className="text-gray-600"
                            onClick={(e) => {
                                e.stopPropagation()
                                onChange && onChange(undefined)
                            }}/>
                    </div>
                </div>
            </Field>
            <Modal 
                isOpen={isOpen} 
                setIsOpen={() => setIsOpen(!isOpen)}
            >
                <Calendar 
                    // employeeId={1} 
                    value={value}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    open={isOpen}
                    changeMode="select"/>
            </Modal>
        </div>
    )
}