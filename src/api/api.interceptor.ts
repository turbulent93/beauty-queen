import { IAuthDto } from "@/services/auth/auth.interface";
import axios from "axios";
import { getTokens, setTokens } from "./api.handler";


export const instance = axios.create({
    baseURL: process.env.API_URL,
})

instance.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("AccessToken")}`

    return config
})  

instance.interceptors.response.use(async config => config,
    errors => {
        const origRequest = errors.config
        if(errors?.response?.status == 401 && errors.config && !errors._isRetry) {
            origRequest._isRetry = true
            try {
                axios.post<IAuthDto>(process.env.API_URL + "admin/refresh-token", {
                    ...getTokens()
                }).then(response => {
                    setTokens(response.data)
                })

                return instance.request(origRequest)
            } catch(e) {
                console.log(e)
            }
        }
        
        throw errors
    })

