const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./router/routes');
const universityRoutes = require('./router/univesityRoute');
const courseRoutes = require('./router/courseRoute');
const applicationRoutes = require('./router/applicationRoute');
const adminRoutes = require('./router/adminRoutes');
const roleAndPermissionRoutes = require('./router/roleAndPermissionRoute');
const studentRoutes = require('./router/studentRoute');
const adminUserRoute = require('./router/adminUserRoute');
const connectDb = require('./Config/connectDb');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDb();

const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.PROD_ORIGIN : process.env.LOCAL_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/api', universityRoutes);
app.use('/api', courseRoutes);
app.use('/api', applicationRoutes);
app.use('/api', studentRoutes);
app.use('/api', roleAndPermissionRoutes);
app.use('/admin', adminRoutes);
app.use('/role', adminUserRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
