import swaggerAutogen from 'swagger-autogen';

// Definir las rutas y salida del archivo de documentación
const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/*.js'];  // Archivos de rutas a analizar

const options = {
  info: {
    title: 'API CAPPirote',
    description: 'Generación automática de documentación Swagger',
  },
};

// Generar el archivo Swagger (en JSON)
swaggerAutogen(outputFile, endpointsFiles, options);