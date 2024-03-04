import { Dayjs } from "dayjs"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

type ValueProps = {
    value: Dayjs,
    setValue: (value: Dayjs) => void,
    startDate?: Dayjs,
    endDate?: Dayjs
}

export default function Years({value, setValue, startDate, endDate}: ValueProps) {
    const isMin = () => startDate?.isSame(value, "year")
    const isMax = () => endDate?.isSame(value, "year")
    
    const decreaseYear = () => !isMin() && setValue(value.set("year", value.year() - 1))
    const increaseYear = () => !isMax() && setValue(value.set("year", value.year() + 1))


    return (
        <div className="flex justify-between py-4 px-1">
            <div>
                <AiOutlineArrowLeft
                    className={isMin() ? "text-default-200" : "cursor-pointer"}
                    onClick={decreaseYear}
                />
            </div>
            {
                value.year()
            }
            <div>
                <AiOutlineArrowRight
                    className={isMax() ? "text-default-200" : "cursor-pointer"}
                    onClick={increaseYear}
                />
            </div>
        </div>
    )
}