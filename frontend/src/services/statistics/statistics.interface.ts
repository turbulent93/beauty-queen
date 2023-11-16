export interface IStatisticsResponse {
    labels: string[]
    values: number[]
}

export interface IStatisticsDto {
    startDate?: string, 
    endDate?: string, 
    employeeId?: number
}