import * as AWS from 'aws-sdk';
import { headers } from '../core/constants/constants';
import { put } from '../utils/put-to-client';
import { isValidProduct } from '../utils/validate-product';
import { v4 } from 'uuid';

export const createProduct = async (event: any): Promise<any> => {
  try {
    const ddb = new AWS.DynamoDB.DocumentClient();
    const { body }: any = event;
    const product = JSON.parse(body);
    console.log('Incoming info for new product: ', body);
    if (isValidProduct(product)) {
      const productItem = {
        id: v4(),
        title: product.title,
        description: product.description,
        price: product.price
      };
     
      await put({
        TableName: process.env.PRODUCTS_TABLE_NAME,
        Item: productItem
      }, ddb);
      
      await ddb.transactWrite({
        TransactItems: [
          {
            Put: {
              TableName: process.env.STOCKS_TABLE_NAME,
              // ConditionExpression: "attribute_not_exists(product_id)",
              Item: {
                product_id: { S: productItem.id },
                count: { N: product.count },
              }
            },
          },
          {
            ConditionCheck: {
              TableName: process.env.PRODUCTS_TABLE_NAME,
              ConditionExpression: "attribute_exists(id)",
              Key: {
                id: { S: productItem.id },
              },
            },
          }
        ]
      }).promise();

      console.log('New product is posted: ', productItem);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(productItem),
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify('Product model is not correct'),
      }
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(e?.message),
    };
  }
};
