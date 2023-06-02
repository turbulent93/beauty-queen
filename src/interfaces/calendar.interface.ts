export interface IMonth {
    name: string
    number: number
}

export interface IDate {
    number: number
    isSelected?: boolean
}

export interface ITime {
    hours: number
    minutes: number
    isSelected?: boolean
}

export interface Interval {
    startAt: Date
    endAt: Date
}

export interface PeriodInterval {
    startAt: string
    endAt: string
}

export type CalendarModeType = "admin" | "user"