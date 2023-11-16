import { instance } from "@/api/api.interceptor"
import { IStatisticsResponse } from "./statistics.interface"

const STATISTICS_URL = process.env.API_URL + "/statistics"

export const StatisticsService = {
    getRevenueStatistics(startDate?: string, endDate?: string) {
        return instance.get<IStatisticsResponse>(STATISTICS_URL + "/revenue", {params: {startDate, endDate}})
    },
    getUsersStatistics(startDate?: string, endDate?: string) {
        return instance.get<IStatisticsResponse>(STATISTICS_URL + "/users", {params: {startDate, endDate}})
    }
}