import {IUser} from "../models/IUser.ts";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService.ts";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse.ts";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem("token", response.accessToken);
            this.setAuth(true);
            this.setUser(response.user);
        } catch (error: unknown) {
            // @ts-ignore
            console.log(error.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem("token", response.accessToken);
            this.setAuth(true);
            this.setUser(response.user);
        } catch (error: unknown) {
            // @ts-ignore
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (error: unknown) {
            // @ts-ignore
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/api/refresh`, {withCredentials: true});
            console.log(response)
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            // @ts-ignore
            console.log(error.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }


}
