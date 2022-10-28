export function isValidProduct(product: any) {
  const productKeys = Object.keys(product);

  if (!(productKeys.length === 4 && product.hasOwnProperty('title') && product.hasOwnProperty('description') && product.hasOwnProperty('price') && product.hasOwnProperty('count'))) {
    return false;
  }

  return typeof product.title === 'string' && typeof product.description === 'string' && typeof product.price === 'number' && typeof product.count === 'number';
}
