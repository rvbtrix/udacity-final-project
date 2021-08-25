import { ICreateTodoRequest } from '../requests/CreateTodoRequest'
import { todoItemDatasource } from '../sources/datasource/todoitem-datasource'
import { ITodoItem } from '../entities/todo-item';
import { IUpdateTodoRequest } from '../requests/UpdateTodoRequest';

/**
 *
 * @returns
 */
export const getAll = async (): Promise<ITodoItem[]> => {
    try {
        return await todoItemDatasource.getAll();
    } catch (error) {
        console.log('getAll.error', error);
        throw error;
    }
};

/**
 *
 * @param todoId
 * @returns
 */
export const getTodo = async (todoId: string): Promise<ITodoItem> => {
    try {
        return await todoItemDatasource.getByTodoId(todoId);
    } catch (error) {
        console.log('getTodo.error', error);
    }
};

/**
 *
 * @param requestNewTodo
 * @returns
 */
export const createTodo = async (requestNewTodo: ICreateTodoRequest, userId: string): Promise<ITodoItem> => {
    try {
        const reWhiteSpace = new RegExp(/^(?!\s+$)[A-Za-zăâîșțĂÂÎȘȚ\s-]+$/);

        if (!requestNewTodo?.dueDate || !requestNewTodo?.name || 
            !reWhiteSpace.test(requestNewTodo.name)) throw new Error("Name and duedate is requered.");

        const todo: ITodoItem = {
            done: false,
            dueDate: requestNewTodo.dueDate,
            name: requestNewTodo.name,
            userId,
        };

        return await todoItemDatasource.create(todo);
    } catch (error) {
        console.log('createTodo.error', error);
    }
};

/**
 *
 * @param todoId
 * @param todoToUpdate
 * @returns
 */
export const updateTodo = async (todoId: string, todoToUpdate: IUpdateTodoRequest, userId: string): Promise<ITodoItem> => {
    try {
        const todo: ITodoItem = {
            done: todoToUpdate.done,
            dueDate: todoToUpdate.dueDate,
            name: todoToUpdate.name,
        };

        return await todoItemDatasource.update(todoId, userId, todo);
    } catch (error) {
        console.log('updateTodo.error', error);
    }
};

/**
 *
 * @param id
 * @returns
 */
export const deleteTodo = async (todoId: string, userId: string): Promise<boolean> => {
    try {
        return await todoItemDatasource.delete(todoId, userId);
    } catch (error) {
        console.log('deleteTodo.error', error);
    }
};

/**
 *
 * @param todoId
 * @param todoToUpdate
 * @returns
 */
export const updateUrl = async (todoId: string, userId: string, attachmentUrl: string): Promise<ITodoItem> => {
    try {
        return await todoItemDatasource.update(todoId, userId, { attachmentUrl });
    } catch (error) {
        console.log('updateUrl.error', error);
    }
};
