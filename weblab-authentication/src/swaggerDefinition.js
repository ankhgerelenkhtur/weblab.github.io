const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Weblab Authentication API',
    version: '1.0.0',
    description: 'API documentation for Weblab Authentication',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
};

module.exports = swaggerDefinition;