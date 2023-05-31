var AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    let responseBody = ""
    let statusCode = 0
    
    let {id, price, data, phone, address, app} = JSON.parse(event.body);
    
    const params = {
      TableName : 'Items',
      /* Item properties will depend on your application concerns */
      Item: {
         id: id,
         price: price,
         data: data,
         phone: phone,
         address: address,
         app: app
      }
    }
    
    try {
        
        await dynamodb.put(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify('Operação Concluída');
        
    } catch (err) {
          
        statusCode = 200;
        responseBody = JSON.stringify(err);
        
    }
      
    const response = {
        statusCode: statusCode,
        body: responseBody,
    };
    
    return response;
};
