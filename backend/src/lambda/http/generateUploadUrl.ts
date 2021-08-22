import 'source-map-support/register'

import { createImage } from '../../helpers/attachmentUtils'
import middy from '@middy/core'
import { apiGatewayHandleErrors, apiGatewayMiddleware } from '../../external/framework/middlewares/api-gateway-middleware';

export const handler = middy(async ({ pathParameters }) => {
    console.log('Caller event', pathParameters)
    const { todoId } = pathParameters
    
    return await createImage(todoId);
})
    .use(apiGatewayMiddleware(200))
    .use(apiGatewayHandleErrors());
