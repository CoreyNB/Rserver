import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTodos() {
    try {
      return await this.prisma.todo.findMany({
        include: { child: true },
        orderBy: { order: 'asc' },
      });
    } catch (error) {
      console.error(' fetching todos:', error);
      throw new Error(' fetching todos');
    }
  }

  async createTodo(todoDto: TodoDto) {
    const maxOrder = await this.prisma.todo.count();
    return this.prisma.todo.create({
      data: {
        title: todoDto.title,
        description: todoDto.description || '',
        completed: false,
        order: maxOrder + 1,
        parentId: todoDto.parentId || null,
      },
    });
  }

  async updateTodo(id: number, todoDto: TodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: {
        title: todoDto.title,
        description: todoDto.description,
        completed: todoDto.completed ?? false,
        order: todoDto.order ?? undefined,
        parentId: todoDto.parentId ?? null,
      },
    });
  }

  async updateTodoOrder(todos: TodoDto[]) {
    const updatePromises = todos.map((todo, index) =>
      this.prisma.todo.update({
        where: { id: todo.id },
        data: { order: index + 1 },
      }),
    );
    await Promise.all(updatePromises);
    return { message: 'updated' };
  }

  async deleteTodo(id: number) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
