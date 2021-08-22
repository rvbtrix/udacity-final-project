import 'source-map-support/register'
import { apiGatewayHandleErrors, apiGatewayMiddleware } from '../../external/framework/middlewares/api-gateway-middleware'
import { deleteTodo } from '../../helpers/todos'
import middy from '@middy/core';


export const handler = middy(async ({ pathParameters })=> {
    const { todoId } = pathParameters;

    await deleteTodo(todoId);
    
    return { deleted: true };
})
    .use(apiGatewayMiddleware(200))
    .use(apiGatewayHandleErrors());
