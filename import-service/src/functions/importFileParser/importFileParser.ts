import * as AWS from 'aws-sdk';
import * as csvParser from 'csv-parser';
import { headers } from '../../core/constants/constants';
const BUCKET = 'fancy-import-service';
const S3 = new AWS.S3({
  region: 'eu-west-1',
});

export const importFileParser = async (event: any) => {
  console.log(
    'importFileParser incoming event:',
    event,
  );

  try {
    for (const record of event.Records) {
      const s3Stream = S3
        .getObject({
          Bucket: BUCKET,
          Key: record.s3.object.key,
        })
        .createReadStream();

      await new Promise<void>((resolve, reject) => {
        s3Stream
          .pipe(csvParser())
          .on('data', (data) => {
            console.log(
              'importFileParser csvParser data:',
              data,
            );
          })
          .on('error', (error) => {
            console.log(
              'importFileParser csvParser error:',
              error,
            );
            reject(error);
          })
          .on('end', () => {
            resolve();
          });
      });

      await S3
        .copyObject({
          Bucket: BUCKET,
          CopySource: `${BUCKET}/${record.s3.object.key}`,
          Key: record.s3.object.key.replace('uploaded', 'parsed'),
        })
        .promise();

      console.log('importFileParser copy is done');

      await S3
        .deleteObject({
          Bucket: BUCKET,
          Key: record.s3.object.key,
        })
        .promise();
    }

    console.log('importFileParser finished');

    return {
      statusCode: 200,
      headers
    };
  } catch (e) {
    console.log('importFileParser error', e);

    return {
      statusCode: 500,
      headers,
      body: e?.message,
    };
  }
};
