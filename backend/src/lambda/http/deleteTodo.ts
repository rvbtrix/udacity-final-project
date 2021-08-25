import 'source-map-support/register'
import { apiGatewayHandleErrors, apiGatewayMiddleware } from '../../external/framework/middlewares/api-gateway-middleware'
import { deleteTodo } from '../../helpers/todos'
import middy from '@middy/core';


export const handler = middy(async ({ requestContext: { authorizer }, pathParameters })=> {
    const { todoId } = pathParameters;

    console.log('todoId', todoId );
    console.log('authorizer', authorizer.principalId );
    await deleteTodo(todoId, authorizer.principalId);
    
    return { deleted: true };
})
    .use(apiGatewayMiddleware(200))
    .use(apiGatewayHandleErrors());
