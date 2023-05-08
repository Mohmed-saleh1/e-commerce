const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/online-shop';

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  category: String
});

const Product = mongoose.model('product', productSchema);

exports.getAllProducts = () => {

  return new Promise((resovle, reject) => {

    mongoose.set("strictQuery", false);

    mongoose.connect(DB_URL)
      .then(() => { return Product.find({}) })
      .then(products => { console.log("db server is running"); mongoose.disconnect(); resovle(products) })
      .catch(err => reject(err))

  });
};

exports.getProductsByCategory = (cat) => {  // cat is the shortcut for category 

  mongoose.set('strictQuery', false);

  return new Promise((resovle, reject) => {
    mongoose.connect(DB_URL)
      .then(() => { return Product.find({ category : cat }) }, console.log("category founded"))
      .then(prod => { console.log("db server is running"); mongoose.disconnect(); resovle(prod) })
      .catch(err => reject(err))

  });
}

exports.getProductsById = (id) => {

  mongoose.set('strictQuery', false);

  return new Promise((resovle, reject) => {
    mongoose.connect(DB_URL)
      .then(() => { return Product.findById(id) } ,console.log("id founded"))
      .then(product => { mongoose.disconnect(); resovle(product) })
      .catch(err => reject(err))

  })
}


exports.getProduct = () => {

  mongoose.set('strictQuery', false);

  return new Promise((resovle, reject) => {
    mongoose.connect(DB_URL)
      .then(() => { return Product.findOne({}) })
      .then(product => { mongoose.disconnect(); resovle(product) })
      .catch(err => reject(err))

  })
}