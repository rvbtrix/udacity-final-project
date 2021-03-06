import 'source-map-support/register'

import middy from '@middy/core';
import { todoItemDatasource } from '../../sources/datasource/todoitem-datasource';
import { apiGatewayHandleErrors, apiGatewayMiddleware } from '../../external/framework/middlewares/api-gateway-middleware';

export const handler = middy(async ({ requestContext: { authorizer } }) => {

    const res = await todoItemDatasource.getByUserId(authorizer.principalId);

    console.log('res::', JSON.stringify(res));

    return { items: res };
})
    .use(apiGatewayMiddleware(200))
    .use(apiGatewayHandleErrors());
