const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const WebSocket = require("ws");
require("dotenv").config();


const userRoutes = require("./routes/user.routes");

// Connect to my database
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log("Error connecting to database", e));

// Register Swagger
fastify.register(require('@fastify/swagger'))
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
});

// Register routes
fastify.register(userRoutes, { prefix: "/api/v1/users" });

const wss = new WebSocket.Server({ noServer: true });


wss.on("connection", (ws) => {
  console.log("Client connected");



    ws.on('message', function message(data) {
      console.log('received message: '+ data);
      ws.send('received message: '+ data);

      //this is for broadcasting to other clients
      // wss.clients.forEach(function each(client) {
      //   if (client !== ws && client.readyState === WebSocket.OPEN) {
      //     client.send(data, { binary: isBinary });
      //   }
      // });
    });


});


fastify.server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

const start = async () => {
  try {
    await fastify.listen({port: process.env.PORT || 5000});
    fastify.log.info(
      `Server is running on port ${fastify.server.address().port}`
    );
  } catch (error) {
    console.log("Error starting server:", error);
    process.exit(1);
  }
};

start();
