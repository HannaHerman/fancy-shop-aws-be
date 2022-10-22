const AWS = require('aws-sdk');
const { productList } = require('./products');
AWS.config.update({ region: 'eu-west-1' });
const tableName = 'table-name';

const ddb = new AWS.DynamoDB({ apiVersion: '2022-10-16' });

try {
  for (let i = 0; i < productList.length; i++) {
    const params = {
      TableName: tableName,
      Item: {
        id: { S: productList[i].id },
        title: { S: productList[i].title },
        description: { S: productList[i].description },
        price: { N: productList[i].price }
      }
    };
    post(params);
  }
} catch (e) {
  console.log('Error during creating new item', e);
}

function post(params) {
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success");
    }
  });
}
