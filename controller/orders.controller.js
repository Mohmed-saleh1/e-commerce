const ordersModel = require('../models/orders.model')
const cartModel = require('../models/cart.model')



exports.getOrders = (req,res,next)=>{

   ordersModel.displayOrders(req.session.userId)

   .then(items =>{ res.render('orders',{
    items:items,
    isUser:true,
    isAdmin:false
}) })
   .catch(err=>console.log(err))
}

exports.postOrders = (req,res,next)=>{
 
 cartModel.addOrder({
           name:req.body.name,
           price:req.body.price,
           amount:req.body.amount,
           userId:req.session.userId,
           productId:req.body.productId,
           timestamp:Date.now()
       }).then(()=>{
           res.redirect('/orders')
       }).catch(err=>{console.log(err)})

   }