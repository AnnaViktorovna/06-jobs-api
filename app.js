require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const connectDB = require("./db/connect");


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Service API');
});
app.use("/api/auth", authRoutes);


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error-handler'));

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
