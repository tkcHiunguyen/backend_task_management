/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { createTaskDto } from './dto/createTask.dto';
import { deleteTaskByIdDto } from './dto/deleteTaskbyId.dto';
import { updateTaskStatusDto } from './dto/updateTaskById.dto';
import { getTaskWithFilterDto } from './dto/getTaskWithFilter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTaskWithFilterDto:getTaskWithFilterDto): Task[] {
    //console.log(this.TasksService.getAllTasks());
    if(Object.keys(getTaskWithFilterDto)){
      return this.TasksService.getTaskwithFilters(getTaskWithFilterDto)
    }
    return this.TasksService.getAllTasks();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: createTaskDto): Task {
    // console.log(`the body is ${title}`);
    // console.log('des is ' + description);
    return this.TasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  findTaskById(@Param('id') id : string ): Task{
    return this.TasksService.getTaskById(id)
  }
  @Delete()
  deleteTaskbyId(@Body() deleteTaskByIdDto:deleteTaskByIdDto ): void{
    return this.TasksService.deleteTaskbyId(deleteTaskByIdDto);
  }
  @Patch()
  updateTaskStatus(@Body() updateTaskStatusDto:updateTaskStatusDto): Task{
    if(updateTaskStatusDto.status in TaskStatus){
      return this.TasksService.updateTaskStatus(updateTaskStatusDto);
    } 
    throw new Error('Invalid ENUM TaskStatus')
  }
}
