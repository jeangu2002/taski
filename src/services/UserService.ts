import { Service } from "typedi";
import { User } from "../models/User";
import { HttpService } from "./HttpService";

@Service()
export class UserService extends HttpService<User> {

    public authenticate(username:string, password:string) {
        const user: User = {
            username,
            image: 'https://s3.envato.com/files/230713778/EC4A8636_big.jpg'
        }

        localStorage.setItem('user', JSON.stringify(user));
    }
    

    public isAuthenticated() {
        return !!localStorage.getItem('user');
    }
}