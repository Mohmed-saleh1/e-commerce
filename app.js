const express = require('express');
const app = express();
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash =require('connect-flash')
const path = require('path');

const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.router');
const authRouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route')
const ordersRouter = require('./routes/orders.route')
const adminRouter = require('./routes/admin.route')


app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

const STORE = new SessionStore({ uri: 'mongodb://127.0.0.1:27017/online-shop', collection: 'sessions'})

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(flash())

app.use(session({ secret: 'this is not a secret',resave:true, saveUninitialized: false ,store:STORE}))
app.use('/', authRouter)

app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/cart',cartRouter)
app.use('/orders', ordersRouter)
app.use('/admin',adminRouter)


app.listen(3000, (err) =>  console.log("server is running") )
