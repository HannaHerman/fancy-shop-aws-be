export const basicAuthorizer = async (event: any) => {
  console.log('basicAuthorizer: event:', JSON.stringify(event));

  try {
    const authToken = event.headers.Authorization;
    const encodedCreds = authToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const decodedCreds = buff.toString('utf-8').split(':');
    const username = decodedCreds[0];
    const password = decodedCreds[1];

    console.log(`basicAuthorizer: userName ${username}, password ${password}`);

    const storedUserPassword = process.env[username];
    const effect = storedUserPassword && storedUserPassword === password ? 'Allow' : 'Deny';

    return {
      principalId: encodedCreds,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: event.methodArn,
        }],
      },
    };

  } catch (e) {
    return {
      statusCode: 401,
      body: e?.message,
    };
  }
};
