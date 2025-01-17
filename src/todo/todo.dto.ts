export class TodoDto {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  order?: number;
  parentId?: number | null;
}
