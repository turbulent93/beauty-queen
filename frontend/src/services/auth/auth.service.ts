import { getTokens, setTokens } from "@/api/api.handler"
import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { IEmployeeWithUserDto } from "../employee/employee.interface"
import { IUser } from "../user/user.interface"
import { IAuthDto, IAuthResponseDto, ILoginDto, IRegisterDto } from "./auth.interface"

const REGISTER_PATH = process.env.REGISTER_PATH!
const LOGIN_PATH = process.env.LOGIN_PATH!
const REFRESH_TOKEN_PATH = process.env.REFRESH_TOKEN_PATH!
const CHECK_TOKEN_PATH = process.env.CHECK_TOKEN_PATH!

export const AuthService = {
    register(loginDto: ILoginDto) {
        return axios.post<string>(REGISTER_PATH, loginDto)
    },
    async login(loginDto: ILoginDto) {
        const res = await axios.post<IAuthDto & IAuthResponseDto>(LOGIN_PATH, loginDto)

        setTokens({...res.data})

        return res
    },
    async refresh() {
        const tokens = getTokens()

        return axios.post<IAuthDto>(REFRESH_TOKEN_PATH, tokens)
    },
    async checkAuth() {
        const tokens = getTokens()

        if(tokens)
            return instance.post<IAuthResponseDto>(CHECK_TOKEN_PATH, tokens)
    }
}