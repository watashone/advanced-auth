import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse.ts";

export default class AuthService {
    static async login(email: string, password: string): Promise<AuthResponse> {
        const response = await $api.post<AuthResponse>('api/login', {email, password});
        return response.data;
    }

    static async registration(email: string, password: string): Promise<AuthResponse> {
        const response = await $api.post<AuthResponse>('api/registration', {email, password});
        return response.data;
    }

    static async logout(): Promise<void> {
        const response = await $api.post<void>('api/logout');
        return response.data;
    }

}



