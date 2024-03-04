import { Dayjs } from "dayjs"
import { CustomButton } from "../button/CustomButton"
import { useEffect, useMemo, useState } from "react"

type ValueProps = {
    value: Dayjs,
    setValue: (value: Dayjs) => void
    startDate?: Dayjs,
    endDate?: Dayjs
}

type MonthType = {
    name: string,
    i: number
}

const monthNames = ['Январь' , 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь' , 'Октябрь' , 'Ноябрь' , 'Декабрь']
const months = monthNames.map((m, i) =>({name: m, i: i}))

export default function Months({value, setValue, startDate, endDate}: ValueProps) {
    const current = useMemo<MonthType[]>(() => {
        let m = months;

        if(startDate && value.year() === startDate.year()) {
            m = m.filter(i => i.i >= startDate.month())
        }

        if(endDate && value.year() === endDate.year()) {
            m = m.filter(i => i.i <= endDate.month())
        }

        return m
    }, [value, startDate, endDate])

    return (
        <div className="flex mb-6 overflow-x-auto gap-3 scrollbar pb-1 flex-grow-0">
            {
                current.map(m => (
                    <CustomButton
                        color={m.i === value.month() ? "red" : "gray"}
                        onClick={() => setValue(value.set("month", m.i))}
                        key={m.name}
                    >
                        {m.name}
                    </CustomButton>
                ))
            }
        </div>
    )
}