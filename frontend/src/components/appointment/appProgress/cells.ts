import { AiOutlinePhone, AiOutlineSchedule, AiOutlineUser } from "react-icons/ai";
import { BsScissors } from "react-icons/bs";
import { ICell } from "./app-cell.interface";

export const appCells: ICell[] = [
    {
        Icon: BsScissors,
        name: "serviceId",
        step: 1
    },
    {
        Icon: AiOutlineUser,
        name: "employeeId",
        step: 2
    },
    {
        Icon: AiOutlineSchedule,
        name: "startAt",
        step: 3
    },
    {
        Icon: AiOutlinePhone,
        name: "phone",
        step: 4
    }
]