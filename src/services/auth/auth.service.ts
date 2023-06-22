import { setTokens } from "@/api/api.handler"
import axios from "axios"
import { IAuthDto, ILoginDto, IUserDto } from "./auth.interface"

const REGISTRATION_PATH = process.env.REGISTRATION_PATH || "",
    LOGIN_PATH = process.env.LOGIN_PATH || ""

export const AuthService = {
    register(loginDto: ILoginDto) {
        return axios.post<string>(REGISTRATION_PATH, loginDto)
    },
    login(loginDto: ILoginDto) {
        return axios.post<IAuthDto & IUserDto>(LOGIN_PATH, loginDto)
            .then(response => {
                setTokens(response.data)
                return response
            })
    }
}