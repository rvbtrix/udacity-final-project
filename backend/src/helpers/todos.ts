import { ICreateTodoRequest } from '../requests/CreateTodoRequest'
import { todoItemDatasource } from '../sources/datasource/todoitem-datasource'
import { ITodoItem } from '../entities/todo-item';
import { IUpdateTodoRequest } from '../requests/UpdateTodoRequest';

/**
 *
 * @returns
 */
export const getAll = async (): Promise<ITodoItem[]> => {

    return await todoItemDatasource.getAll();
};

/**
 *
 * @param todoId
 * @returns
 */
export const getTodo = async (todoId: string): Promise<ITodoItem> => {

    return await todoItemDatasource.getByTodoId(todoId);
};

/**
 *
 * @param requestNewTodo
 * @returns
 */
export const createTodo = async (requestNewTodo: ICreateTodoRequest, userId: string): Promise<ITodoItem> => {
    const todo: ITodoItem = {
        done: false,
        dueDate: requestNewTodo.dueDate,
        name: requestNewTodo.name,
        userId,
    };

    return await todoItemDatasource.create(todo);
};

/**
 *
 * @param todoId
 * @param todoToUpdate
 * @returns
 */
export const updateTodo = async (todoId: string, todoToUpdate: IUpdateTodoRequest, userId: string): Promise<ITodoItem> => {
    const todo: ITodoItem = {
        done: todoToUpdate.done,
        dueDate: todoToUpdate.dueDate,
        name: todoToUpdate.name,
        userId
    };

    return await todoItemDatasource.update(todoId, todo);
};

/**
 *
 * @param id
 * @returns
 */
export const deleteTodo = async (id: string): Promise<boolean> => {
    
    return await todoItemDatasource.delete(id);
};

/**
 *
 * @param todoId
 * @param todoToUpdate
 * @returns
 */
export const updateUrl = async (todoId: string, attachmentUrl: string): Promise<ITodoItem> => {
   
    return await todoItemDatasource.update(todoId, { attachmentUrl });
};
