const express = require('express');
const cors = require("cors");

const connectDb = require('./Config/connectDB');
const bodyParser = require('body-parser');
const routes = require('./router/routes');
const universityRoutes = require('./router/univesityRoute');
const studentRoutes = require('./router/studentRoute');

const app = express();
const port = 3000;

connectDb();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/api', universityRoutes);
app.use('/api', studentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
