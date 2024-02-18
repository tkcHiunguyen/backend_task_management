import { IsEnum, isEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class updateTaskStatusDto{
    id: string;
    @IsEnum(TaskStatus)
    status : TaskStatus;
}