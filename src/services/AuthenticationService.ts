import Container, { Service } from "typedi";
import { UserService } from "./UserService";

@Service()
export class AuthenticationService {

    constructor(private userService:UserService) {
        this.userService = Container.get(UserService)
    }

    public isAuthenticated() {
        return this.userService.isAuthenticated();
    }

    public authenticate(username:string, password:string) {
        this.userService.authenticate(username, password);
        return this.isAuthenticated();
    }

}