export async function put(params: any, ddb: AWS.DynamoDB.DocumentClient): Promise<any> {
  try {
    const result = await ddb.put(params).promise();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
