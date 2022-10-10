import { productList } from './products';
import { headers } from '../core/constants/constants';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(productList),
  };
};
