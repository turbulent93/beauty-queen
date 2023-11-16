import { FC } from "react";
import { Grid } from "../Grid";

const days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]

export const Days: FC = () => {
    return (
        <Grid className="min-w-[400px] mb-3">
            {
                days.map(day => (
                    <div key={day} className="p-2 text-center select-none cursor-pointer border-b">
                        {day}
                    </div>
                ))
            }
        </Grid>
    )
}