import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',  
  info: {
    title: 'API Cappirote',
    version: '1.0.0',
    description: 'Esta es la documentación de la API Cappirote',  
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

// Generar el documento Swagger
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };