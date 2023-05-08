const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/online-shop";
const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
});

const cartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_URL)
      .then(() => cartItem.find({ productId: data.productId }))
      .then((exist) => {
        if (exist.length > 0) {
          console.log(`The item ${data.name} already exists and the value increased with ${data.amount} pices`);
          return cartItem.updateOne(
            { productId: data.productId },
            { $inc: { amount: data.amount } }
          );
        } else {
          let item = new cartItem(data);
          return item.save();
        }
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getItmeByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);

    mongoose
      .connect(DB_URL)
      .then(() => {
        return cartItem.find({ userId: userId }, {}, { timestamps: 1 });
      })
      .then((items) => {
        resolve(items), mongsoose.disconnect();
      })
      .catch((err) => {
        mongoose.disconnect(), reject(err);
      });
  });
};

exports.editItem = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(DB_URL)
      .then(() => {
        return cartItem.updateOne({ _id: id }, newData);
      })
      .then((items) => {
        mongoose.disconnect(), resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect(), reject(err);
      });
  });
};

exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(DB_URL)
      .then(() => {
        return cartItem.findByIdAndDelete(id);
      })
      .then(() => {
        mongoose.disconnect(), resolve();
      })
      .catch((err) => reject(err));
  });
};
exports.deleteAllItems = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(DB_URL)
      .then(() => {
        return cartItem.deleteMany({ userId: userId });
      })
      .then(() => {
        mongoose.disconnect(), resolve();
      })
      .catch((err) => reject(err));
  });
};
exports.orderItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(DB_URL)
      .then(() => {
        return cartItem.findById(id);
      })
      .then(() => {
        mongoose.disconnect(), resolve();
      })
      .catch((err) => reject(err));
  });
};
