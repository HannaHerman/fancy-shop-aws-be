import * as AWS from 'aws-sdk';
import { headers } from '../core/constants/constants';
import { get } from '../utils/get-from-client';

export const getProductsById = async (event: any): Promise<any> => {
  try {
    const ddb = new AWS.DynamoDB.DocumentClient();
    const productId = event?.pathParameters?.productId;
    console.log('Product id from request: ', productId);
    const productsParams = {
      TableName: process.env.PRODUCTS_TABLE_NAME,
      Key: {
        id: productId
      }
    };
    const stocksParams = {
      TableName: process.env.STOCKS_TABLE_NAME,
      Key: {
        product_id: productId
      }
    };
    const targetProduct = await get(productsParams, ddb);
    console.log('Found product info: ', targetProduct?.Item);
    const productStock = await get(stocksParams, ddb);
    console.log('Found stocks info: ', productStock?.Item);
    targetProduct.count = productStock.count;
    if (targetProduct?.Item) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...targetProduct?.Item,
          count: productStock?.Item?.count
        }),
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify(`Product was not found, id: ${productId}`),
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: e?.message,
    };
  }
};
