import * as AWS from 'aws-sdk';
import { headers } from '../../core/constants/constants';

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

    const s3 = new AWS.S3({
      region: 'eu-west-1',
    });
    const filePath = `uploaded/${name}`;

    const params = {
      Bucket: 'fancy-import-service',
      Key: filePath,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
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
