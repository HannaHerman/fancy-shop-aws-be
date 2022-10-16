export interface Product {
  "id": number,
  "title": string,
  "count": number,
  "description": string,
  "price": number
}

export type ProductList = Array<Product>;
