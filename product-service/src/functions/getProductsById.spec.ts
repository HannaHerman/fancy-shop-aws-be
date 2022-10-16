import { getProductsById } from './getProductsById';

const givenGetProductsByIdResponse = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
  body: {
    "id": "14b03511-4af0-433a-82da-3cf16c8f96e7",
    "title": "Bear",
    "count": 1,
    "description": "Teddy Bear",
    "price": 400,
  },
};

describe("getProductsById function", () => {
  it('should give expected result', async () => {
    const result = await getProductsById({
      pathParameters: {
        productId: "14b03511-4af0-433a-82da-3cf16c8f96e7",
      }
    });
    expect(JSON.parse(result.body)).toStrictEqual(givenGetProductsByIdResponse.body);
  });
});
