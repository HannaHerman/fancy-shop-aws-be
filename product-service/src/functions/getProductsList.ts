import * as AWS from 'aws-sdk';
import { headers } from '../core/constants/constants';
import { scan } from '../utils/scan-client';

export const getProductsList = async (event: any): Promise<any> => {
  try {
     // For testing
     const error = event?.queryStringParameters?.error;
     if (error && Boolean(error)) throw new Error('Test 500 error');

    const ddb = new AWS.DynamoDB.DocumentClient();
    const productsParams = { TableName: process.env.PRODUCTS_TABLE_NAME };
    const stocksParams = { TableName: process.env.STOCKS_TABLE_NAME };
    const allProducts = await scan(productsParams, ddb);
    console.log('Found products: ', allProducts?.Items);
    const allStocks = await scan(stocksParams, ddb);
    console.log('Found stocks: ', allStocks?.Items);
    const finalList = allProducts?.Items.map((item: any) => ({
      ...item,
      count: allStocks?.Items?.find((el: any) => el.product_id === item.id)?.count
    }));

    if (allProducts) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(finalList),
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify('Products are not found'),
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
