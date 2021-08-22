// import { ITodoItem } from './../../entities/todo-item';
// import middy from '@middy/core';
// import { APIGatewayEvent } from 'aws-lambda';
// import { apiGatewayHandleErrors, apiGatewayMiddleware } from '../../external/framework/middlewares/api-gateway-middleware';
// import { todoItemDatasource } from '../../sources/datasource/todoitem-datasource';
// import { oauthUseCase } from '../../usecases/oauth-usecase';

// export const shortData = middy(async (event: APIGatewayEvent) => {
//     console.log()
//     //await oauthUseCase.authenticate(event, 'cadastro');

//     const todo:ITodoItem = {
//         done: false,
//         name:'Reginaldo',
//         userId:'11',
//         dueDate: '2021-08-16',
//         attachmentUrl: 'ss',
//         createdAt: '2021-08-16',
//         todoId: 'df',
//     };

//     await todoItemDatasource.create(todo);
    
//     const res = await todoItemDatasource.getAll();
//     console.log('aaaa', JSON.stringify(res));

//     return res;
//     // return {
//     //     name: 'Jose Roberto de Souza',
//     //     age: '22',
//     //     profession: 'Artesão',
//     //     company: 'Autonomo'            
//     // };
// })
//     .use(apiGatewayMiddleware(200))
//     .use(apiGatewayHandleErrors());