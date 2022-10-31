import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import * as AWS from 'aws-sdk';
import * as csvParser from 'csv-parser';

const s3 = new AWS.S3({ region: 'eu-west-1' });
const importFileParser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { name } = event.queryStringParameters;
    const key = name || null;
    if (!key) {
      throw new Error('Name is not found');
    }
    const getObjectParams = {
      Bucket: 'fancy-import-service',
      Key: `uploaded/${key}`,
      ContentType: 'text/csv'
    }
    const s3Stream = await s3.getObject(getObjectParams).createReadStream();
    s3Stream
      .pipe(csvParser()).on('data', (data) => {
        console.log(data);
      }).on('error', (e) => {
        return formatJSONResponse({
          e,
          err: true
        });
      }).on('end', (data) => {
        return formatJSONResponse({
          message: `Parsed successfully`,
          data,
        });
      });
  }
  catch (e) {
    return formatJSONResponse({ ...e, err: true });
  }
};

export const main = middyfy(importFileParser);
