import { isValidProduct } from './validate-product';

const validRequest = {
  'title': 'Test',
  'description': 'test',
  'price': 10,
  'count': 5
};

const invalidRequest = {
  'description': 10,
  'price': 'test'
};

describe('isValidProduct function', () => {
  it('should return true for valid request', async () => {
    expect(isValidProduct(validRequest)).toBeTruthy();
  });

  it('should return false for invalid request', async () => {
    expect(isValidProduct(invalidRequest)).toBeFalsy();
  });
});
