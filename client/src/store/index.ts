import {makeAutoObservable} from "mobx";
import {IUser} from "../models/IUser";
import AuthService from "../services/authService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";


export default class Store {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth(isAuth: boolean) {
        this.isAuth = isAuth
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setAuthData(auth: AuthResponse) {
        const {accessToken, user} = auth;
        localStorage.setItem('token', accessToken);
        this.setIsAuth(true);
        this.setUser(user)
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            this.setAuthData(response.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            this.setAuthData(response.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser({} as IUser)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            this.setAuthData(response.data)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}