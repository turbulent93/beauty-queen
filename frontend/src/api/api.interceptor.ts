import { IAuthDto } from "@/services/auth/auth.interface";
import { AuthService } from "@/services/auth/auth.service";
import axios, { AxiosError } from "axios";
import { getTokens, setTokens } from "./api.handler";


export const instance = axios.create({
    baseURL: process.env.API_URL,
})

instance.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${getTokens()?.accessToken}`

    return config
})  

instance.interceptors.response.use(async config => config,
    async errors => {
        const origRequest = errors.config
        if(errors?.response?.status == 401 && errors.config && !errors._isRetry) {
            origRequest._isRetry = true

            try {
                const res = await AuthService.refresh()
                if(res?.status != 401 && res?.data) {
                    setTokens(res.data)
    
                    return instance.request(origRequest)
                }
            } catch (e) {
                // const axiosError = e as AxiosError

                // if(axiosError.status != 401) {
                //     throw e
                // }
            }
        } else {
            throw errors
        }
        
    })

