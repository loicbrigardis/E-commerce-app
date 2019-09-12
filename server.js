//MODULES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

//VARIABLES
const port = process.env.PORT || 8000;

//IMPORTS
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const braintreeRoute = require('./routes/braintree');
const orderRoute = require('./routes/order');

//APP
const app = express();

//DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => { console.log('DB connected') })
    .catch((err) => { console.error(err) });

//MIDDLEWARES
app.use(morgan('dev'));
app.use(compression())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

//ROUTES MIDDLEWARES
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', braintreeRoute);
app.use('/api', orderRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', index.html));
})

//LISTENER
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})