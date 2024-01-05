const express=require(`express`)


const frontcontroller =require('../controllers/frontcontroller.js')
const coursecontroller = require('../controllers/coursecontroller.js')
const UserModal=require('../modals/User.js')
const checkuserauth=require('../middlewear/auth.js')
const checkuserauth2=require('../middlewear/auth2.js')
const AdminController = require('../controllers/admin/AdminController.js')

const route=express.Router()

// router
// frontcontroller
route.get('/',frontcontroller.login)

route.get('/registration',frontcontroller.registration)  
route.get('/contact',checkuserauth,frontcontroller.contact)
route.get('/about',checkuserauth,frontcontroller.about)
route.get('/home',checkuserauth,frontcontroller.home)

// route
route.post('/userinsert',frontcontroller.userinsert)
// console.log('shree')
route.post('/verifylogin',frontcontroller.verifylogin)
route.get('/logout',checkuserauth,frontcontroller.logout)
route.get('/profile/_id',checkuserauth,frontcontroller.profile) 
route.post('/passwordupdate',checkuserauth,frontcontroller.updatepassword)
route.post('/profileupdate/:id',checkuserauth,frontcontroller.updateprofile)

// coursecontroller
route.post('/courseinsert',checkuserauth,coursecontroller.courseinsert)

route.get('/display',checkuserauth,coursecontroller.coursedisplay)

route.get('/view/:id',checkuserauth,coursecontroller.view)
route.get('/edit/:id',checkuserauth,coursecontroller.courseedit)
route.post('/courseupdate/:id',checkuserauth,coursecontroller.courseupdate)                                  
route.get('/coursedelete/:id',checkuserauth,coursecontroller.coursedelete)
// admincontroller
route.get('/admin/display',checkuserauth2,AdminController.display) 
route.get('/admin/view/:id',checkuserauth2,AdminController.view) 
route.get('/adminabout',checkuserauth2,frontcontroller.about)  
route.get('/admincontact',checkuserauth2,frontcontroller.contact) 
route.get('/admin/coursedelete/:id',checkuserauth2,AdminController.coursedelete) 
route.get('/logoutadmin',checkuserauth2,frontcontroller.logout)  
route.get('/admin/profileadmin/_id',checkuserauth2,frontcontroller.profile)
route.post('/admin/passwordupdate',checkuserauth2,frontcontroller.updatepassword)
route.post('/admin/profileupdate/:id',checkuserauth2,frontcontroller.updateprofile)
route.post('/admin/updatestatus/:id',checkuserauth2,AdminController.updatestatus)
module.exports=route   