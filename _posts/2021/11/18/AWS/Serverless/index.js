const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    let body = event.httpMethod;
    let statusCode = '200';
    const headers = {
        'Access-Control-Allow-Origin': '*'
    };
    let payload;
    const tablename = "serverless_2";
    
    try {
        switch (event.httpMethod) {
            case 'DELETE':
                 payload = {
                    TableName: tablename,
                        Key: {
                            "no" : event.no,
                        },
                };
                body = await dynamo.delete(payload).promise();
                break;
            case 'GET':
                payload = {
                    TableName: tablename,
                        Key: {
                            "no" : event.no,
                        },
                };
                body = await dynamo.scan(payload).promise();
                break;
            case 'POST':
                payload = {
                    TableName: tablename,
                    Item: {
                        "no" : event.no,
                        "title" : event.title,
                        "content" : event.content
                    },
                };
                body = await dynamo.put(payload).promise();
                break;
            case 'PUT':
                payload = {
                    TableName: tablename,
                    Key: {
                        "no" : event.no
                    },
                    UpdateExpression: "set title = :x, content = :y",
                    ExpressionAttributeValues:{
                        ":x" : event.title,
                        ":y" : event.content
                    }
                };
                body = await dynamo.update(payload).promise();
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '200';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body: body,
        headers,
    };
};
