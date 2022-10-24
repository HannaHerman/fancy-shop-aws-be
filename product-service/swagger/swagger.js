// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "product-service",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      },
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "getProductsById",
        "description": "",
        "operationId": "getProductsById.get.products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "\"id\"": {
          "title": "Product.\"id\"",
          "type": "number"
        },
        "\"title\"": {
          "title": "Product.\"title\"",
          "type": "string"
        },
        "\"count\"": {
          "title": "Product.\"count\"",
          "type": "number"
        },
        "\"description\"": {
          "title": "Product.\"description\"",
          "type": "string"
        },
        "\"price\"": {
          "title": "Product.\"price\"",
          "type": "number"
        }
      },
      "required": [
        "\"id\"",
        "\"title\"",
        "\"count\"",
        "\"description\"",
        "\"price\""
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    },
    "ProductList": {
      "items": {
        "$ref": "#/definitions/Product"
      },
      "title": "ProductList",
      "type": "array"
    }
  },
  "securityDefinitions": {}
};