export async function get(params: any, ddb: AWS.DynamoDB.DocumentClient): Promise<any> {
  try {
    const result = await ddb.get(params).promise();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
