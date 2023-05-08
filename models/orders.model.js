const mongoose = require('mongoose')
const DB_URL = "mongodb://127.0.0.1:27017/online-shop";

const orderSchema = mongoose.Schema({
    name:   String,
    amount: Number,
    cost:  Number,
    address: String,
    status:String,
    userId: String,
    productId: String,
    timestamp: Date


})

const orderItem = mongoose.model('orders',orderSchema)

exports.displayOrders = userId =>{
    return new Promise((resolve,reject)=>{
        mongoose.set('strictQuery', false);

        mongoose.connect(DB_URL)
        .then(() => { return orderItem.find({},{},{timestamps:1})})
        .then((order) => { resolve(order), mongsoose.disconnect()})
        .catch(err => {mongoose.disconnect(), reject(err)})
    })
}

exports.addOrder = data => {
    return new Promise((resolve, reject) => {
        mongoose.set('strictQuery', false);
            
         mongoose.connect(DB_URL) 
            .then(() => { let order = new orderItem(data); return order.save(); })
            .then(() => { mongoose.disconnect(), resolve() })
            .catch(err => reject(err))
    })
}