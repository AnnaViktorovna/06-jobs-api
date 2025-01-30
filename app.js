require('dotenv').config();
require('express-async-errors');
const express = require('express');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const app = express();
const authRoutes = require("./routes/auth");
const connectDB = require("./db/connect")


const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.send('service api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
