import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { createTaskDto } from './dto/createTask.dto';
import { findTaskByIdDto } from './dto/findTaskbyId.dto';
import { deleteTaskByIdDto } from './dto/deleteTaskbyId.dto';
import { updateTaskStatusDto } from './dto/updateTaskById.dto';
import { getTaskWithFilterDto } from './dto/getTaskWithFilter.dto';
import { serialize } from 'v8';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskwithFilters(getTaskWithFilterDto: getTaskWithFilterDto): Task[]{
    const {status,search} = getTaskWithFilterDto
    let tasks=this.getAllTasks()
    if(status){
      tasks= tasks.filter(tasks=> tasks.status===status)
    }
    if(search){
      console.log(search)
      tasks=tasks.filter(tasks=>
        tasks.title.includes(search)|| tasks.description.includes(search)
      )
    }
    return tasks
  }

  createTask(createTaskDto : createTaskDto): Task {
    const {title,description} = createTaskDto
    const task: Task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string ): Task| undefined {
    const found = this.tasks.find(task => task.id===id )
    if(!found){
      throw new NotFoundException(`task with ${id} does not exist :<`)
    }
    return found
  }
  deleteTaskbyId(deleteTaskByIdDto: deleteTaskByIdDto): void {
    const {id} = deleteTaskByIdDto
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id; // Return true to keep tasks with different IDs
    });
  }
  updateTaskStatus(updateTaskStatusDto: updateTaskStatusDto): Task{
    const {id,status} = updateTaskStatusDto
    const task = this.getTaskById(id)
    task.status=status
    return task
  } 
}