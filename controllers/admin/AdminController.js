const UserModal = require('../../modals/User')
const courseModal=require('../../modals/course')
const jwt=require('jsonwebtoken') 
class AdminController{
    static display =async(req,res)=>{  
        try{
            // console.log("hello world")
            const{firstname,lastname,email,image,_id}=req.data1
            let y="display"
            const data= await courseModal.find()
            // console.log(firstname)
          res.render('admin/display',{n:(firstname+" "+lastname).toUpperCase(),x:y,img:image,d:data})
        }catch(error){
            console.log(error)
        }
    }
    static view =async(req,res)=>{
        try{
            // console.log("hello world")
            const{firstname,lastname,email,image,_id}=req.data1
            // console.log("tttte")
            // console.log(_id)
            let y="view"
            const data= await courseModal.findById(req.params.id)
            // console.log(data)
            // console.log(firstname)
          res.render('admin/view',{d:data,n:(firstname+" "+lastname).toUpperCase(),img:image,x:y})
        }catch(error){
            console.log(error) 
        }
    }
    static coursedelete=async(req,res)=>{
        try{
            // console.log(req.params.id)
            // res.render('view')
            // console.log("too")
            const data= await courseModal.findByIdAndDelete(req.params.id)
            // console.log(data) 
      
            res.redirect('/admin/display')
      
        }catch(err){
          console.log(err)
        }
      }
    static updatestatus=async(req,res)=>{
        try{
            // console.log(req.params.id)
            // res.render('view')
            // console.log("too")
            const data= await courseModal.findByIdAndUpdate(req.params.id,{
              commit:req.body.commit,
              status:req.body.status,
            })
            res.redirect('/admin/display')
            // console.log(data)
            // console.log(req.body)
      
            
      
        }catch(err){
          console.log(err)
        }
      }
}
module.exports=AdminController