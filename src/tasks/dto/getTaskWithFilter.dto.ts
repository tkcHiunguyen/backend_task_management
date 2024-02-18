import { TaskStatus } from "../task.model";

export class getTaskWithFilterDto{
    status: TaskStatus;
    search: string;
}