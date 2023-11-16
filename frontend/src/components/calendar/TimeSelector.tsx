import { Button } from "@/ui/Button";
import { Loader } from "@/ui/Loader";
import { getPeriods } from "@/utils/calendar/timepicker/getPeriods";
import clsx from "clsx";
import { FC, useEffect, useRef } from "react";

interface TimeSelectorProps {
    value?: string
    onChange: (value?: string) => void
    label?: string
    error?: string
    defaultStartAt?: string
    defaultEndAt?: string
    includeLast?: boolean
}

export const TimeSelector: FC<TimeSelectorProps> = ({
    value, 
    onChange, 
    label, 
    error, 
    defaultStartAt, 
    defaultEndAt,
    includeLast
}) => {
    const ref = useRef<HTMLButtonElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(ref.current)
            containerRef?.current?.scrollTo({
                behavior: "smooth",
                left: ref.current?.offsetLeft - containerRef.current?.offsetLeft
            });
    }, [value])

    return (
        <div className="flex flex-col mb-2">
            <label className={clsx("mr-2 mb-2 whitespace-nowrap", error ? "text-red-500" : "text-gray-500")}>
                {
                    label
                }
            </label>
            {
                defaultStartAt && defaultEndAt ?
                <div className="flex gap-3 overflow-x-scroll scrollbar scrollbar-gray pb-1" ref={containerRef}>
                        {
                            getPeriods(defaultStartAt, defaultEndAt, includeLast).map((p, i) => (
                                <Button 
                                    ref={p.time == value ? ref : undefined}
                                    key={i}
                                    theme={p.time == value ? "gray" : "light-gray"}
                                    onClick={e => {
                                        e?.preventDefault()
                                        onChange(p.time)
                                    }}
                                >
                                    {
                                        p.time
                                    }
                                </Button>
                            )) 
                        }
                </div> :
                <Loader />
            }
        </div>
    )
}