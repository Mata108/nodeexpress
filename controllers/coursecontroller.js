 const courseModal=require('../modals/course')

 class coursecontroller{
static courseinsert=async(req,res)=>{
    try{ const {_id}=req.data1;
    
         const data= new courseModal({
            
             name:req.body.name,
             email:req.body.email,
             phone:req.body.phone,
             tenth:req.body.tenth,
             twelth:req.body.twelth,
             course:req.body.course,
             user_id:_id,


         })
        await data.save()
        res.redirect('./display')
        // console.log(req.body)
    }catch(error){
        console.log(error)
    }

}
 
static coursedisplay=async(req,res)=>{
  try{
    const{firstname,lastname,image,_id}=req.data1
    let y="coursedisplay"
    const data =await courseModal.find({user_id:_id})
    //  console.log(data)
    res.render('display',{d:data,n:(firstname+" "+lastname).toUpperCase(),img:image,x:y})
  }catch(err){
    console.log(err)
  }
}
static view=async(req,res)=>{
  try{
      // console.log(req.params.id)
      // res.render('view')
      const{firstname,lastname,image}=req.data1
      let y="courseview"
      const data= await courseModal.findById(req.params.id)
      // console.log(data)

      res.render('view',{d:data,n:(firstname+" "+lastname).toUpperCase(),img:image,x:y})
  }catch(err){
    console.log(err)
  }
}
static courseedit=async(req,res)=>{
  try{
      // console.log(req.params.id)
      // res.render('view')
      const{firstname,lastname,image}=req.data1
      let y="courseedit"
      const data= await courseModal.findById(req.params.id)
      // console.log(data)

      res.render('edit',{d:data,n:(firstname+" "+lastname).toUpperCase(),img:image,x:y})
  }catch(err){
    console.log(err)
  }
}
static courseupdate=async(req,res)=>{
  try{
      // console.log(req.params.id)
      // res.render('view')
       
      const data= await courseModal.findByIdAndUpdate(req.params.id,{
        
            
          name:req.body.name,
          email:req.body.email,
          phone:req.body.phone,
          tenth:req.body.tenth,
          twelth:req.body.twelth,
          course:req.body.course,
          


      
      })
      // console.log(data)

      res.redirect('/display')

  }catch(err){
    console.log(err)
  }
}
static coursedelete=async(req,res)=>{
  try{
      // console.log(req.params.id)
      // res.render('view')
      const data= await courseModal.findByIdAndDelete(req.params.id)
      // console.log(data)

      res.redirect('/display')

  }catch(err){
    console.log(err)
  }
}

}
module.exports=coursecontroller