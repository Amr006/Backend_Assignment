# Backend Assignment

## Description
Fastify application with CRUD operations endpoints with swagger Documentation and integrate a socket server to enable bidirectional communication

## Installation
1. Clone this repository to your local machine.
2. Install dependencies using `npm install` 
3. Add the .env file that includes your MONGODB_URL you can see example in .sample.env

## Running the Server
To start the server, follow these steps:
1. Navigate to the project directory in your terminal.
2. Run the command `npm start`
3. The server should now be running on port 5000 by default.

## Accessing the Client Interface (Postman)
To access the client interface using Postman, follow these steps:
1. Download and install Postman from [here](https://www.postman.com/downloads/).
2. Launch Postman on your local machine.
3. Import the provided Postman collection file.
4. Once imported, you should see the collection with all the available endpoints.
5. Set the base URL to `http://localhost:5000`.
6. You can now make requests to the server using the client interface in Postman.

couldn't export the webSocket collection because postman doesn't support. 
so i screenShot my webSocket collection.

## Accessing the Swagger Server
To access the Swagger server, follow these steps:
1. Ensure the server is running locally (follow the steps in the "Running the Server" section if it's not running).
2. Open a web browser.
3. Navigate to `http://localhost:5000/documentation`.
4. You should now see the Swagger UI interface displaying all available endpoints and their descriptions.
5. Explore the API and interact with the endpoints directly from the Swagger interface.


