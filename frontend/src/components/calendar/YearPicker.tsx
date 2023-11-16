import { useCalendar } from "@/providers/CalendarProvider";
import clsx from "clsx";
import moment from "moment";
import { FC, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type DisplayYearType = "prev" | "next"

export const YearPicker: FC = () => {
    const {selectedYear, setSelectedYear, startDate, endDate, value, open}  = useCalendar()

    const isPrevYearAvailable = () => {
        const startYear = moment(startDate, "YYYY-MM-DD").year()

        return selectedYear != startYear
    }

    const isNextYearAvailable = () => {
        const endYear = moment(endDate, "YYYY-MM-DD").year()

        return selectedYear != endYear
    }
        
    const handler = (type: DisplayYearType) => {
        if(!selectedYear) return 

        if(type == "prev") {
            setSelectedYear(selectedYear - 1)
        } else {
            setSelectedYear(selectedYear + 1)
        }
    }

    useEffect(() => {
        if(open && value?.date) {
            const year = moment(value.date, "YYYY-MM-DD").year()

            setSelectedYear(year)
        }
    }, [open])

    useEffect(() => {
        if(!value?.date) {
            setSelectedYear(new Date().getFullYear())
        }
    }, [])

    return (
        <div className="flex justify-between py-4 px-1">
                <div>
                    <AiOutlineArrowLeft 
                        className={clsx({
                            "text-gray-400": !isPrevYearAvailable(),
                            "cursor-pointer": isPrevYearAvailable()
                        })} 
                        onClick={() => isPrevYearAvailable() && handler("prev")}/>
                </div>
                {
                    selectedYear
                }
                <div>
                    <AiOutlineArrowRight 
                        className={clsx({
                            "text-gray-400": !isNextYearAvailable(),
                            "cursor-pointer": isNextYearAvailable()
                        })}
                        onClick={() => isNextYearAvailable() && handler("next")}/>
                </div>
            </div>
    )
}