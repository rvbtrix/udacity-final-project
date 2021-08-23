import 'source-map-support/register'
import { ICreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../helpers/todos'
import { apiGatewayHandleErrors, apiGatewayMiddleware } from '../../external/framework/middlewares/api-gateway-middleware'
import middy from '@middy/core';

export const handler = middy(async ({ requestContext: { authorizer }, body })=> {
    const newTodo: ICreateTodoRequest = body;

    const todo = await createTodo(newTodo, authorizer.principalId);

    return { item: todo };
})
    .use(apiGatewayMiddleware(200))
    .use(apiGatewayHandleErrors());