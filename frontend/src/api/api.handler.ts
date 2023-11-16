import { IAuthDto } from "@/services/auth/auth.interface";
import { AxiosError } from "axios";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "",
    REFRESH_TOKEN = process.env.REFRESH_TOKEN || ""

export const catchError = (error: AxiosError) => {
    return {
        message: error.status == 403 || error.status == 401 ? 
            "Ошибка авторизации" :
            error.status == 400 ?
            "Ошибка сервера" :
            "Ошибка подключения"
    }  
}

export const getTokens = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)

    if(!accessToken || !refreshToken) {
        return
    }

    return {
        accessToken,
        refreshToken
    }
}

export const setTokens = (tokens: IAuthDto) => {
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken)
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken)
}

export const removeTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}