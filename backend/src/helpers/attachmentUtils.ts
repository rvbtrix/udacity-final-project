// Const XAWS = AWSXRay.captureAWS(AWS)

import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import { todoItemDatasource } from '../sources/datasource/todoitem-datasource'
import { updateUrl } from './todos'
import * as uuid from 'uuid'

const s3 = new AWS.S3({
    signatureVersion: 'v4'
})

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

/**
 * 
 * @param todoId 
 * @returns 
 */
export const createImage = async (todoId: string) => {
    try {
        const validTodoId = await todoExists(todoId);
    
        if (!validTodoId) return { error: 'Todo does not exist!' };
    
        const imageId = uuid.v4();
    
        console.log('imageId:uuid:', imageId);
    
        const newItem = await setImageUrl(todoId, imageId);
    
        console.log('newItem::', newItem);
    
        const url = getUploadUrl(imageId);
    
        return {
            newItem: newItem,
            uploadUrl: url
        }
    } catch (error) {
        console.log('createImage.error', error);
    }
}

/**
 * 
 * @param todoId 
 * @returns 
 */
async function todoExists(todoId: string) {
    console.log('Get todo1: ', todoId)

    const result = await todoItemDatasource.getByTodoId(todoId);

    console.log('Get todo: ', result)

    return !!result
}

/**
 * 
 * @param todoId 
 * @param imageId 
 * @param event 
 * @returns 
 */
async function setImageUrl(todoId: string, imageId: string) {

    return await updateUrl(todoId, `https://${bucketName}.s3.amazonaws.com/${imageId}`);
}

/**
 * 
 * @param imageId 
 * @returns 
 */
function getUploadUrl(imageId: string) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageId,
        Expires: +urlExpiration
    })
}
