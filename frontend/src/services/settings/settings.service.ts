import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { ISettings } from "./settings.interface"

const SETTINGS_PATH = process.env.SETTINGS_PATH!
const API_URL = process.env.API_URL!

export const SettingsService = {
    get: () => {
        return axios.get<ISettings>(API_URL + SETTINGS_PATH)
    },
    update: (data: ISettings) => {
        return instance.put(SETTINGS_PATH, data)
    }
}