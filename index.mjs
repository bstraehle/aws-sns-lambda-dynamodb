import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const DDB = new DynamoDBClient();
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
    for (const record of event.Records) {
        const msg = record.Sns.Message;

        console.log('Message:', msg);

        await DDB.send(new PutItemCommand({
            TableName: TABLE_NAME,
            Item: {
                id: { S: msg }
            }
        }));
    }
};
