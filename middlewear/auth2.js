const jwt=require('jsonwebtoken')
const UserModal = require('../modals/User.js')

const checkuserauth2 = async(req,res,next)=>{
// console.log("hello auth")
const {token}=req.cookies
// console.log(token)
// console.log(req.cookies) 
// console.log("hero")
if(!token){
    req.flash('error','unauthorized user,please login')
    // res.redirect('./')
}else{
    // console.log(token)
    const verifytoken= jwt.verify(token,'sitaRam@108000000')
    // console.log(verifytoken) 
    // console.log("yo")
    const data= await UserModal.findOne({_id:verifytoken.ID})
    req.data1=data
    // console.log(data)
     
    next() 
 }
}
module.exports=checkuserauth2