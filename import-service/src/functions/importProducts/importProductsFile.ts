import * as AWS from 'aws-sdk';
import { headers } from '../../core/constants/constants';
const S3 = new AWS.S3({
  region: 'eu-west-1',
});

export const importProductsFile = async (event: any) => {
  console.log(
    'importProductsFile incoming event:',
    event,
  );

  try {
    const { name } = event.queryStringParameters;

    if (!name) {
      throw new Error('Name is not found');
    }

    const filePath = `uploaded/${name}`;

    const params = {
      Bucket: 'fancy-import-service',
      Key: filePath,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const signedUrl = await S3.getSignedUrlPromise('putObject', params);
    console.log('importProductsFile finished');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(signedUrl)
    };
  } catch (e) {
    console.log('error', e);

    return {
      statusCode: 500,
      headers,
      body: e?.message,
    };
  }
};
