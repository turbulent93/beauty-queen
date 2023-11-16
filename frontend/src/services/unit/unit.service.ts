import { instance } from "@/api/api.interceptor"
import { IUnit } from "./unit.interface"

export const UnitService = {
    get() {
        return instance.get<IUnit[]>("/units")
    }
}