import { IAppointmentDto } from "@/services/app/app.interface";
import { IconType } from "react-icons/lib";

export interface ICell {
    Icon: IconType,
    name: keyof IAppointmentDto,
    step: number
}