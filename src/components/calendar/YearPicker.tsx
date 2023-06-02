import clsx from "clsx";
import { FC } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface YearPickerProps {
    selectedYear: number
    setSelectedYear: (value: number) => void
}

const DISPLAYED_YEARS = 2

type DisplayYearType = "prev" | "next"

export const YearPicker: FC<YearPickerProps> = ({selectedYear, setSelectedYear}) => {
    const isDisplayYear = (type: DisplayYearType = "prev") => {
        const curYear = new Date().getFullYear()

        return (type == "prev" && selectedYear != curYear) || 
            (type == "next" && selectedYear != curYear + DISPLAYED_YEARS - 1)
    }
        
    const handler = (type: DisplayYearType) => {
        if(type == "prev") {
            setSelectedYear(selectedYear - 1)
        } else {
            setSelectedYear(selectedYear + 1)
        }
    }

    return (
        <div className="flex justify-between py-4 px-1">
                <div>
                    <AiOutlineArrowLeft 
                        className={clsx({
                            "text-gray-400": !isDisplayYear(),
                            "cursor-pointer": isDisplayYear()
                        })} 
                        onClick={() => handler("prev")}/>
                </div>
                {
                    selectedYear
                }
                <div>
                    <AiOutlineArrowRight 
                        className={clsx({
                            "text-gray-400": !isDisplayYear("next"),
                            "cursor-pointer": isDisplayYear("next")
                        })}
                        onClick={() => handler("next")}/>
                </div>
            </div>
    )
}