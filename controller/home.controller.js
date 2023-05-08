const productsModel = require('../models/products.model')

exports.getHome = (req, res, next) => {

    let categors = req.query.category

    let productsPromis
    let validCategories = [ 'Clothing', 'Phone', 'Tablet', 'Laptop' ]
    if (categors && validCategories.includes(categors)) productsPromis = productsModel.getProductsByCategory(categors)


    else productsPromis = productsModel.getAllProducts()
    productsPromis.then(products => {
        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAdmin:req.session.isAdmin,
            validationErrors: req.flash('validationErrors')[ 0 ]
        })
    })
} 