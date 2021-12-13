const express = require('express');
const mongoose = require('mongoose');
const logger=require('./utility/logger.js');
const userRouter = require('./app/routes/user.routes.js');
const bookRouter = require('./app/routes/book.routes.js')
const db = require('./config/dbConnect.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors=require('cors');

// create express app
const app = express();

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());
app.use(cors());
app.use('/users',userRouter);
app.use('/books', bookRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//image upload
app.use(express.static("uploads"));

mongoose.Promise = global.Promise;

// Connecting to the database
// listen for requests
const server=app.listen(4000, () => {
    logger.info("Server is listening on port 4000");
    db.dbConnection();
});

module.exports=server;