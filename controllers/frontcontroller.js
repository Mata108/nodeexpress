const UserModal = require('../modals/User.js')
const courseModal = require('../modals/course.js')
const cloudinary = require('cloudinary').v2;
const brcypt=require('bcryptjs')
const jwt= require('jsonwebtoken')

cloudinary.config({
    cloud_name: 'ddpowodla',
    api_key: '393855291736591',
    api_secret: '9LJCkK4Dz3KLvFQuAbzT42P2nqw'
});

class frontcontroller {
    static login = async (req, res) => {
        try {
            
            res.render("login",{message:req.flash('error')})
        } catch (error) {
            console.log(error)
        }

    }
    static registration = async(req, res)=>{
        try {
            res.render("registration",{message:req.flash('error')})
        } catch (error) {
            console.log(error)
        }

    }
    static contact = async (req, res) => {
        try {
            // res.send("hello dashboard"         
            const{firstname,lastname,email,image,role,_id}=req.data1
            // console.log(req.data1)
            let y="contact"
            res.render('contact',{n:(firstname+" "+lastname).toUpperCase(),img:image,x:y,r:role})
        } catch (error) {
            console.log(error) 
        }  

    }
    static about = async (req, res) => {
        try { 
            const{firstname,lastname,email,image,role,_id}=req.data1
            let y="about"
            res.render("about",{n:(firstname+" "+lastname).toUpperCase(),x:y,img:image,r:role})
        } catch (error) {
            console.log(error)
        } 


    }
    static home = async (req, res) => {
        try {
            const{firstname,lastname,email,image,_id}=req.data1
             let y="home"
             const btech= await courseModal.findOne({user_id:_id,course:'Btech'})
             const Bca= await courseModal.findOne({user_id:_id,course:'Bca'})
             const Mca= await courseModal.findOne({user_id:_id,course:'Mca'})
            
            res.render("home",{n:(firstname+" "+lastname).toUpperCase(),img:image,email:email,x:y,btech:btech,bca:Bca,mca:Mca})
            //  res.send("hello")
        } catch (error) {
            console.log(error)
        }


    }
    static userinsert = async (req, res) => {

        try {
            
            const imagefile = req.files.image
            const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: 'profileimage'
            })
            
            const { firstname, lastname, email, password, confirmpassword } = req.body
            const user = await UserModal.findOne({ email: email })
            if (user) {
                req.flash('error', 'email already exists')
                res.redirect('./registration')
            } else {
                if (firstname && lastname && email && password && confirmpassword) {
                    if (password == confirmpassword) {
                        try {
                            const hashpassword = await brcypt.hash(password, 10);
                            const datauser = new UserModal({
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                password: hashpassword,
                                image: {
                                    public_id: imageupload.public_id,
                                    url: imageupload.secure_url
                                }
                            })
                            await datauser.save()
                            req.flash('success',' Successfully your Registration,Plesase login')
                            res.redirect('./')
                            // console.log(datauser)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    else {
                        req.flash('error', 'passsword and confirm password does not match ')
                        res.redirect('./registration')
                    }
                }
                else {
                    req.flash('error', 'all fields are required')
                    res.redirect('./registration')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

  static verifylogin= async(req,res)=>{
    // console.log('ram')
    
try {
    // console.log(req.body)
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModal.findOne({ email: email })
//   console.log(user)

      if (user != null) { 
        const isMatched = await brcypt.compare(password, user.password)
        if ( isMatched) {
            // generate token
            if(user.role=='admin'){
                const token = jwt.sign({ ID: user._id }, 'sitaRam@108000000');
                // console.log(token) 
                // console.log("namaste ji")
                res.cookie('token',token)
                // console.log(token)
                res.redirect('/admin/display')
            }
            else{ 
                if(user.role=='student'){
                const token = jwt.sign({ ID: user._id }, 'Ramsita@108000000');
                // console.log(token) 
                res.cookie('token',token)
                res.redirect('/home')
            }}
           
          
          
        } else {
          req.flash('error', 'Email or password is not valid')
          return res.redirect('/')
        }
      } else {
        req.flash('error', 'You are not a registered user')
        return res.redirect('/')
      }
    } else {
      req.flash('error', 'All Fields Required')
      return res.redirect('/')
    }
  } 

  catch(error){
    console.log(error)
  }




}

static logout=async(req,res)=>{
    try{
        // console.log("hello")
        res.clearCookie('token')
  res.redirect('/')
    }catch(error){
        console.log(error)
    }
}

static profile=async(req,res)=>{
    try{
        // console.log("hello ji")
        // res.render()
        const{firstname,lastname,email,image,role,_id}=req.data1
        // const data= await UserModal.findById(req.body._id)
        let y="profile"
        const data = await UserModal.findOne({ email: email })
        // console.log(data)
        if(data.role =='admin'){
            // console.log("real")
            res.render('admin/profileadmin',{n:(firstname+" "+lastname).toUpperCase(),img:image,t:data,x:y,message:req.flash('error')})
        }
        else{
            if(data.role =='student') 
            res.render('profile',{n:(firstname+" "+lastname).toUpperCase(),img:image,t:data,x:y,message:req.flash('error')})
        }
//   res.redirect('/') 
    }catch(error){
        console.log(error)
    }
}
static updateprofile=async(req,res)=>{
    try{
        
        const{id}=req.data1
       
        const { firstname, lastname, email} = req.body
        
        const user = await UserModal.findById(id)
        if (req.files){
    // const user = await UserModal.findOne({ email: email })
    // const user = await UserModal.findById(req.body.email);
    const image_id = user.image.public_id;
    await cloudinary.uploader.destroy(image_id);

    const file = req.files.image;  
    const myimage = await cloudinary.uploader.upload(file.tempFilePath, { 
        folder: "profileimage",

    });
    var data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
        },
    };
} else {
    var data = {
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        email: req.body.email,

    }
    // console.log(email)
}
const update_profile = await UserModal.findByIdAndUpdate(id, data)
if(user.role=='admin'){
    //  console.log("ttt")
    res.redirect('/admin/profileadmin/_id')
}else{
    if(user.role=='student'){

        res.redirect('/profile/_id')
    }
}
        
//   res.redirect('/') 
    }catch(error){
        console.log(error) 
    }
}
static updatepassword=async(req,res)=>{
    try{
        // console.log("hello ji")
        // res.render()
        const{firstname,lastname,email,image,_id}=req.data1
        // const data= await UserModal.findById(req.body._id)
        // console.log(req.body)
        const user = await UserModal.findOne({ email: email })
        const { old_password, new_password, cpassword } = req.body;
      if (old_password && new_password && cpassword) {
        const user = await UserModal.findById(_id);
        const ismatch = await brcypt.compare(old_password, user.password);
        if (!ismatch) {
          req.flash("error", "Old password is incorrect.");
          if(user.role=='admin'){
            return res.redirect("admin/profileadmin/:id'");
          }else{
            if(user.role=='student'){

                return res.redirect("/profile/_id");
            }
          }
        } else {
          if (new_password !== cpassword) {
            req.flash("error", "Password and confirm password do not match.");
            if(user.role=='admin'){
                return res.redirect("admin/profileadmin/:id'");
              }else{
                if(user.role=='student'){
    
                    return res.redirect("/profile/_id");
                }
              }
          } else {
            const newHashpassword = await brcypt.hash(new_password, 10);
            await UserModal.findByIdAndUpdate(_id, {
              $set: { password: newHashpassword },
            });
            req.flash(
              "success",
              "Password changed successfully. Please log in with your new password."
            );
            if(user.role=='admin'){
                return res.redirect("/logoutadmin");
              }else{
                if(user.role=='student'){
    
                    return res.redirect("/logout");
                }
              }
            
          }
        }
      } else {
        req.flash("error", "All fields are required.");
        
        if(user.role=='admin'){
            return res.redirect("admin/profileadmin/:id'");
          }else{
            if(user.role=='student'){

                return res.redirect("/profile/_id");
            }
          }
      }

//   res.redirect('/')
    }catch(error){
        console.log(error)
    }
}
// static profileupdate=async(req,res)=>{
//     try{
//         console.log("hello ji")
//         // res.render()
//         const{firstname,lastname,email,image,_id}=req.data1
//         // const data= await UserModal.findById(req.body._id)
//         const data = await UserModal.findOneAndUpdate({ email: email,
//          })
//         console.log(data)
        
//         // res.render('profile',{n:(firstname+" "+lastname).toUpperCase(),img:image,t:data})
// //   res.redirect('/')
//     }catch(error){
//         console.log(error)
//     }
// }
  
} 
module.exports = frontcontroller

