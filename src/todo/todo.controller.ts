import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  createTodo(@Body() todoDto: TodoDto) {
    return this.todoService.createTodo(todoDto);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() todoDto: TodoDto) {
    return this.todoService.updateTodo(Number(id), todoDto);
  }

  @Put('order')
  updateTodoOrder(@Body() todos: TodoDto[]) {
    return this.todoService.updateTodoOrder(todos);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(Number(id));
  }
}
