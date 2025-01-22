import $api from "../http";
import {IUser} from "../models/IUser.ts";

export default class UserService {
    static fetchUsers(): Axios.IPromise<Axios.AxiosXHR<IUser[]>> {
        return $api.get<IUser[]>('api/users');
    }
}



