import { productList } from './products';
import { headers } from '../core/constants/constants';

export const getProductsList = async () => {
  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(productList),
  };
};
