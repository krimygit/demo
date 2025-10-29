const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Demo API",
    version: "1.0.0",
    description: `Demo API Collection`,
  },
  servers: [
    {
      url: process.env.API_BASE_URL || "http://localhost:3000/v1",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {   // 👈 name must match your endpoint doc
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],  // 👈 global requirement (can override per-route)
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/api/auth/auth.route.js",
    "./src/utils/swagger.yml",
  ],
};

module.exports = swaggerJSDoc(options);
