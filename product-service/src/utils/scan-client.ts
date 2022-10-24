export async function scan(params: any, ddb: AWS.DynamoDB.DocumentClient): Promise<any> {
  try {
    const result = await ddb.scan(params).promise();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
