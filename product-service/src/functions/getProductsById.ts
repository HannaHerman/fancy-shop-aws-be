import { productList } from './products';
import { headers } from '../core/constants/constants';

export const getProductsById = async (event: any) => {
  const productId = event?.pathParameters?.productId;
  const targetProduct = productList.find(el => el.id === productId);
  if (targetProduct) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(targetProduct),
    };
  } else {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify(`Product was not found, id: ${productId}`),
    };
  }
};
