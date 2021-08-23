import { ITodoItem } from '../../entities/todo-item';
import { TodoItemModel } from '../models/todoitem-model';

interface ITodoItemDatasourse {
    getAll(): Promise<ITodoItem[]>;
    getByTodoId(todoId: string): Promise<ITodoItem>;
    getByUserId(authorizationCode: string): Promise<ITodoItem[]>;
    create(todoItem: ITodoItem): Promise<ITodoItem>;
    update(todoId: string, userId: string, todoItem: Partial<ITodoItem>);
    delete(todoId: string);
}

class TodoItemDatasource implements ITodoItemDatasourse {
    public getAll = async (): Promise<ITodoItem[]> => {
        const response = await TodoItemModel.scan()
            .all()
            .exec();

        return (response.toJSON() as unknown) as Promise<ITodoItem[]>;
    };

    public getByUserId = async (userId: string): Promise<ITodoItem[]> => {
        const response = await TodoItemModel
            .query({ userId: { eq: userId } })
            .exec();

        return (response.toJSON() as unknown) as Promise<ITodoItem[]>;
    }

    public getByTodoId = async (todoId: string) => {
        const response = await TodoItemModel
            .query({ todoId: { eq: todoId } })
            .exec();

        const todoArray = (response.toJSON() as unknown) as ITodoItem[];

        return (todoArray.length > 0) ? todoArray[0] : undefined;
    };

    public create = async (todoItem: ITodoItem) => TodoItemModel.create(todoItem);
    
    public update = async (todoId: string, userId: string, todoItem: Partial<ITodoItem>) => TodoItemModel.update({ todoId, userId, }, todoItem);

    public delete = async (todoId: string) => TodoItemModel.delete(todoId);
}

export const todoItemDatasource: ITodoItemDatasourse = new TodoItemDatasource();
