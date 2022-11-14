import * as AWS from 'aws-sdk';
import { headers } from '../core/constants/constants';
import { put } from '../utils/put-to-client';
import { isValidProduct } from '../utils/validate-product';
import { v4 } from 'uuid';

const ddb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS({
  region: 'eu-west-1',
});

export const catalogBatchProcess = async (event: any): Promise<any> => {
  console.log('catalogBatchProcess event:', event);

  try {
    const products: any[] = [];
    await Promise.all(event.Records.map(async (event: any) => {
      const parsedProduct = JSON.parse(event.body);
      const productItem = {
        ...parsedProduct,
        price: parsedProduct.price ? +parsedProduct.price : undefined,
        count: parsedProduct.count ? +parsedProduct.count : undefined,
      };

      console.log('Product before validation', productItem);

      if (isValidProduct(productItem)) {
        productItem.id = v4();
        products.push(productItem);
      } else {
        console.log('Product is not valid', productItem);
        productItem.status = "Validation failed";
        products.push(productItem);
        return
      }

      await put({
        TableName: process.env.STOCKS_TABLE_NAME,
        Item: {
          product_id: productItem.id,
          count: productItem.count,
        }
      }, ddb);

      delete productItem.count;

      await put({
        TableName: process.env.PRODUCTS_TABLE_NAME,
        Item: productItem
      }, ddb);
    }));

    sns.publish({
      Subject: 'Products are updated',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN,
    }, (err) => {
      if (err) {
        console.log("Error while sending email: ", err);
      } else {
        console.log("Email was sent: ", JSON.stringify(products));
      }
    });

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(
        {
          message: 'Batch processed',
        },
        null,
        2,
      )
    };
  } catch (e) {
    console.log('Error during posting new product', e);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(e?.message),
    };
  }
}
