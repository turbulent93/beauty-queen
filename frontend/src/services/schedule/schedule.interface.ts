export interface ISchedule {
    id: number,
    date: string,
    employeeId: number
    startAt?: string
    endAt?: string
}

export interface IScheduleDto extends Omit<ISchedule, "id"> {
    id?: number
} 

export interface FillScheduleDto {
    employeeId: number
    startDate?: string
    endDate?: string
    workDays?: number
    weekendDays?: number
    onlyWorkDays?: boolean
    onlyWeekendDays?: boolean
    startAt?: string
    endAt?: string
}