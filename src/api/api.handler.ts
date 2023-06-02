import { IAuthDto } from "@/services/auth/auth.interface";
import { IToast } from "@/store/toasts.slice";
import { AxiosError } from "axios";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "",
    REFRESH_TOKEN = process.env.REFRESH_TOKEN || ""

export const catchError = (error: AxiosError): IToast => {
    return {
        message: error.status == 403 || error.status == 401 ? 
            "Ошибка авторизации" :
            error.status == 400 ?
            "Ошибка сервера" :
            "Ошибка подключения"
    }  
}

export const getTokens = () => {
    return {
        accessToken: localStorage.getItem(ACCESS_TOKEN),
        refreshToken: localStorage.getItem(REFRESH_TOKEN)
    }
}

export const setTokens = (tokens: IAuthDto) => {
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken)
}