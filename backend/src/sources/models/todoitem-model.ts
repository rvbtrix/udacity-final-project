import { Document } from 'dynamoose/dist/Document';
import { v4 as uuid } from 'uuid';
import { ITodoItem } from '../../entities/todo-item';
import { DynamoDatabase } from '../../external/databases/dynamoose-database';

const tableName = process.env.TODOITEM_DB_TABLE || 'env TODOITEM_DB_TABLE not found';

export const TodoItemModel = DynamoDatabase.model<ITodoItem & Document>(tableName, new DynamoDatabase.Schema(
    {
        userId: {
            type: String,
            hashKey: true,
        },
        todoId: {
            type: String,
            default: () => uuid(),
            rangeKey: true,
            index: {
                name: 'todoIdIndex',
                global: true,
                project: true,
            },
        },

        createdAt: String,
        name: String,
        dueDate: String,
        done: Boolean,
        attachmentUrl: String
    }
));