import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { IMeta } from "./meta.interface"

const META_PATH = process.env.META_PATH!
const API_URL = process.env.API_URL!

export const MetaService = {
    get: () => {
        return axios.get<IMeta>(API_URL + META_PATH)
    },
    update: (data: IMeta) => {
        return instance.put(META_PATH, data)
    }
}