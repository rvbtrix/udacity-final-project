import 'source-map-support/register'
import { updateTodo } from '../../helpers/todos'
import { IUpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { apiGatewayHandleErrors, apiGatewayMiddleware } from '../../external/framework/middlewares/api-gateway-middleware'
import middy from '@middy/core'

export const handler = middy(async ({ requestContext: { authorizer }, pathParameters, body })=> {
    const { todoId } = pathParameters;

    const todoToUpdate: IUpdateTodoRequest = body;
  
    const todo = await updateTodo(todoId, todoToUpdate, authorizer.principalId);

    return todo;
})
    .use(apiGatewayMiddleware(200))
    .use(apiGatewayHandleErrors());