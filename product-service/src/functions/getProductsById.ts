import * as AWS from 'aws-sdk';
import { headers } from '../core/constants/constants';
import { get } from '../utils/init-client';

export const getProductsById = async (event: any): Promise<any> => {
  const ddb = new AWS.DynamoDB.DocumentClient();
  const productId = event?.pathParameters?.productId;
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
  const productStock = await get(stocksParams, ddb);
  targetProduct.count = productStock.count;
  if (targetProduct) {
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
};
