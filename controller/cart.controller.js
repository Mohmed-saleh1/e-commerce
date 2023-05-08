const validationResult = require("express-validator").validationResult;
const cartModel = require("../models/cart.model");

exports.getCart = (req, res, next) => {
  cartModel
    .getItmeByUser(req.session.userId)
    .then((items) => {
      res.render("cart", {
        items: items,
        isUser: true,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash("validationErrors")[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .addNewItem({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        userId: req.session.userId,
        productId: req.body.productId,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect(req.body.redirectTo);
  }
};

exports.postSave = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .editItem(req.body.cartId, { amount: req.body.amount })
      .then(() => res.redirect("/cart"))
      .catch((err) => console.log(err));
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/cart");
  }
};

exports.postDelete = (req, res, next) => {
  {
    cartModel
      .deleteItem(req.body.cartId)
      .then(() => res.redirect("/cart"))
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.postDeleteAll = (req, res, next) => {
  {
    cartModel
      .deleteAllItems(req.session.userId)
      .then(() => res.redirect("/cart"))
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.postOrder = (req, res, next) => {
  cartModel
    .orderItem(req.body.cartId)
    .then(() => res.redirect("/cart/verify"))
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrder = (req, res, next) => {
  res.render("verify", {
    isUser: true,
    isAdmin:false
  });
};
