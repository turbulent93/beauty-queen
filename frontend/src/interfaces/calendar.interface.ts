export interface IMonth {
    name: string
    number: number
}

export interface IDate {
    number: number
    date: string
    scheduleId?: number
    startAt?: string
    endAt?: string
}

export interface ITime {
    time: string
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