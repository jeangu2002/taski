import axios from "axios";

export class HttService<Type> {

    constructor() {
        axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
    }
    protected get<Type>(url: string) {
         return axios.get<Type>(url)
    }
    protected post<Type>(url: string, data: Type) {
         return axios.post<Type>(url, data)
    }

    protected delete(url:string) {
        return axios.delete(url);
    }

}