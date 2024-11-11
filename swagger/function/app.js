const express = require('express');
const serverless = require('serverless-http');
const swaggerUI = require('swagger-ui-express');
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const apigateway = new AWS.APIGateway();
const region = process.env.AWS_REGION;
const stage = process.env.STAGE_NAME;

const app = express();

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve Swagger UI
app.use('/swagger-ui', swaggerUI.serve);
app.get('/swagger-ui', (req, res, next) => {
  try {
    const RestApiId = req.apiGateway?.event?.requestContext?.apiId || process.env.API_ID;
    console.log('API ID:', RestApiId);
    
    if (!RestApiId) {
      throw new Error('API ID not found in request context or environment variables');
    }

    const swaggerOptions = {
      swaggerUrl: `https://${RestApiId}.execute-api.${region}.amazonaws.com/${stage}/swagger`,
      swaggerOptions: {
        url: `https://${RestApiId}.execute-api.${region}.amazonaws.com/${stage}/swagger`
      }
    };
    
    swaggerUI.setup(null, swaggerOptions)(req, res, next);
  } catch (error) {
    console.error('Error in /swagger-ui route:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve Swagger JSON
app.get('/swagger', async (req, res) => {
  try {
    console.log("Entered /swagger function");
    const RestApiId = req.apiGateway?.event?.requestContext?.apiId || process.env.API_ID;
    console.log('API ID for Swagger JSON:', RestApiId);

    if (!RestApiId) {
      throw new Error('API ID not found in request context or environment variables');
    }

    const params = {
      exportType: 'swagger',
      restApiId: RestApiId,
      stageName: stage,
      accepts: 'application/json'
    };

    console.log('GetExport params:', params);

    const data = await apigateway.getExport(params).promise();
    console.log('GetExport result:', data);

    res.setHeader('Content-Type', 'application/json');
    res.send(data.body);
  } catch (error) {
    console.error('Error fetching Swagger JSON:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports.lambda_handler = serverless(app);