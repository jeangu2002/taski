import axios from "axios";

export class HttService<Type> {

    constructor() {
        axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
    }
    protected get<Type>(url: string) {
         return axios.get<Type>(url)
    }

}