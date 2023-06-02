import { instance } from "@/api/api.interceptor"
import { IEmployeeDto } from "./employee.interface"

const EMPLOYEE_PATH = process.env.EMPLOYEE_PATH || ""

export const EmployeeService = {
    post(data: FormData) {
        return instance.post(EMPLOYEE_PATH, data)
    },
    get(search?: string) {
        return instance.get<IEmployeeDto[]>(EMPLOYEE_PATH, search ? {params: {search}} : {})
    },
    getByService(serviceId: number, search?: string) {
        return instance.get<IEmployeeDto[]>(`${EMPLOYEE_PATH}/by-service/${serviceId}`, search ? {params: {search}} : {})
    },
    update(id: number, data: FormData) {
        return instance.put(`${EMPLOYEE_PATH}/${id}`, data)
    },
    getById(id: string) {
        return instance.get(`${EMPLOYEE_PATH}/${id}`)
    },
    delete(id: number) {
        return instance.delete(`${EMPLOYEE_PATH}/${id}`)
    }
}