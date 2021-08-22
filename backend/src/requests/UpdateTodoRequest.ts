/**
 * Fields in a request to update a single TODO item.
 */
export interface IUpdateTodoRequest {
  name: string
  dueDate: string
  done: boolean
}