import { setTokens } from "@/api/api.handler"
import axios from "axios"
import { IAuthDto, ILoginDto } from "./auth.interface"

const REGISTRATION_PATH = process.env.REGISTRATION_PATH || "",
    LOGIN_PATH = process.env.LOGIN_PATH || ""

export const AuthService = {
    register(loginDto: ILoginDto) {
        return axios.post<string>(REGISTRATION_PATH, {login: loginDto.login, password: loginDto.password})
    },
    async login(loginDto: ILoginDto) {
        return axios.post<IAuthDto>(LOGIN_PATH, {login: loginDto.login, password: loginDto.password})
            .then(response => {
                setTokens(response.data)
            })
    }
}