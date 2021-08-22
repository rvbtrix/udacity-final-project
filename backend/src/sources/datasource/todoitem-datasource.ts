/* eslint-disable max-len */

import { ITodoItem } from '../../entities/todo-item';
import { TodoItemModel } from '../models/todoitem-model';

interface ITodoItemDatasourse {
    getAll(): Promise<ITodoItem[]>;
    getByTodoId(todoId: string): Promise<ITodoItem>;
    getByUserId(authorizationCode: string): Promise<ITodoItem[]>;
    create(todoItem: ITodoItem): Promise<ITodoItem>;
    update(todoId: string, todoItem: Partial<ITodoItem>);
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
    
    public update = async (todoId: string, todoItem: Partial<ITodoItem>) => TodoItemModel.update({ todoId }, todoItem);

    public delete = async (todoId: string) => TodoItemModel.delete(todoId);
    
    /**
     * 
     * @param response 
     * @returns 
     */
    private handleResponse(response) {
        const todoItemArray = response as unknown as ITodoItem[];

        return (todoItemArray.length > 0) ? todoItemArray[0] : undefined;
    }
}

export const todoItemDatasource: ITodoItemDatasourse = new TodoItemDatasource();
