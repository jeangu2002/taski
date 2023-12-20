import { HttpService } from "./HttpService";
import { Task } from "../models/Task";
import { Service } from "typedi";

@Service()
export class TaskService extends HttpService<Task> {
  
     constructor() {
        super();
    }
    async getAllTasks() {
        return await this.get<Task[]>('/task')
    }

    async createTask(task:Task) {
        return await this.post('/save-task', task);
    }

    async deleteTask(taskId:number) {
        return await this.delete(`/delete/${taskId}`);
    }
}