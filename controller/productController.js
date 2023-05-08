 const  validationResult = require("express-validator").validationResult
const productsModel = require("../models/products.model")

exports.getProductsById = (req,res,next)=>{

    let id =  req.params.id;
    productsModel.getProductsById(id)
      .then(product=>{res.render('product',{
        product:product,
        isUser:req.session.userId,
        isAdmin:req.session.isAdmin,
        validationErrors: req.flash('validationErrors')[ 0 ]

        
      })}, )
}  
exports.getProduct = (req,res,next)=>{
  let id = req.params.id
  productsModel.getProduct().then(product =>{res.render('product',{
    product:product,
    isUser:req.session.userId,
    isAdmin:req.session.isAdmin,
 
  })})

}
 