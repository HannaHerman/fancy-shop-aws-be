const AWS = require('aws-sdk');
const { productList } = require('./products');
AWS.config.update({ region: 'eu-west-1' });
const tableName = 'table-name';

const ddb = new AWS.DynamoDB({ apiVersion: '2022-10-17' });

try {
  for (let i = 0; i < productList.length; i++) {
    const params = {
      TableName: tableName,
      Item: {
        product_id: { S: productList[i].id },
        count: { N: (Math.floor(Math.random() * 10)).toString() }
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
