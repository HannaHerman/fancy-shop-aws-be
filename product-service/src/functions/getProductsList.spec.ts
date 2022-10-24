import { getProductsList } from './getProductsList';
import { productList } from './products';

describe("getProductsList function", () => {
  it('should give expected result', async () => {
    const result = await getProductsList({});
    expect(JSON.parse(result.body)).toStrictEqual(productList);
  });
});
