import { HttService } from "./HttpService";
import { Task } from "../models/Task";
import { Service } from "typedi";

@Service()
export class TaskService extends HttService<Task> {
  
     constructor() {
        super();
    }
    async getAllTasks() {
        return await this.get<Task[]>('/task')
    }

    async createTask(task:Task) {
        return await this.post('/create-task', task);
    }
}