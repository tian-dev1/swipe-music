const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Mi Proyecto',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger',
    },
    servers: [
      {
        url: process.env.SERVER_URL || 'http://localhost:5000', // Usa la variable de entorno
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta donde están tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  console.log(`📄 Swagger Docs available at: ${process.env.SERVER_URL}/api-docs`);
};

module.exports = swaggerDocs;
