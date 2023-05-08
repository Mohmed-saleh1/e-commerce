exports.getAdmin = (req,res,next)=>{
    res.render('add-product',{
        validationErrors:req.flash('validationErrors'),
        isUser:true,
        isAdmin:true
    })
}



exports.postAdmin = (req,res,next)=>{
    console.log(req.body);
     console.log(req.file);
}