import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { IEmployee, IEmployeeWithIdsDto, IEmployeeWithUserDto } from "./employee.interface"

const EMPLOYEE_PATH = process.env.EMPLOYEE_PATH!
const API_URL = process.env.API_URL!

export const EmployeeService = {
    get(search?: string, serviceId?: number) {
        return axios.get<IEmployee[]>(API_URL + EMPLOYEE_PATH, {params: {search, serviceId}})
    },
    getWithUser() {
        return instance.get<IEmployeeWithUserDto[]>(EMPLOYEE_PATH + "/with-user")
    },
    getById(id: string) {
        return instance.get<IEmployeeWithIdsDto>(`${EMPLOYEE_PATH}/${id}`)
    },
    post(data: IEmployeeWithIdsDto) {
        return instance.post(EMPLOYEE_PATH, data)
    },
    update(data: IEmployeeWithIdsDto) {
        return instance.put(`${EMPLOYEE_PATH}/${data.id}`, data)
    },
    delete(id: number) {
        return instance.delete(`${EMPLOYEE_PATH}/${id}`)
    }
}