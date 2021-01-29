const express=require('express');
const app=express();
const productsRepo=require('../../repositories/products')
const newProductsTemplate=require('../../views/admin/products/new')
const indexProductsTemplate=require('../../views/admin/products/index')
const {validationResult}=require('express-validator')
const {requireTitle, requirePrice}=require('../../validators')
const multer=require("multer")
const {requireAuth}=require('../middlewares')
const productsEditTemplate=require('../../views/admin/products/edit')

//dont forget this

const router=express.Router();
//LOCAL STORAGE. NOT BEST ROUTE.. WILL EFFECT FINAL
const upload=multer({storage:multer.memoryStorage()})
//IF NOTHING IS put in the callback (req, res) the browser will just hang

router.get('/admin/products', requireAuth, async (req, res)=>{
  const products=await productsRepo.getAll();
  res.send(indexProductsTemplate({products}))

})


router.get('/admin/products/new', requireAuth,(req, res)=>{
  res.send(newProductsTemplate({}))
})


//req.on(data, data=>console.log(data))
//wouldn't be able to turn this dbuffer data into a string ETC
//won't work inside post requrest with urlencoded enctype
//need a multipart form data submission enctype
//we USE MULTER TO HANDLE THE IMAGES
//THE ORDER OF THIS IS IMPORTANT BECAUSE WE NEED TO USE MULTER first
// TO PROCESS INCOMING REQUEST... MULTER ALSO PARSES THE DIFFERENT TEXT FIELDS
//INSIDE A POST REQUEST
router.post('/admin/products/new', requireAuth, upload.single('image'), [requireTitle, requirePrice], async (req, res)=>{

  const errors=validationResult(req);
  console.log(req.session.userId)
  if(!errors.isEmpty()){
    return res.send(newProductsTemplate({errors}))
  }
  // default way to essentially do things without a body-parser:
    // req.on('data', data=>{
    //   console.log(data)
    // })
    //this is the image. we need to save the buffer of the image
    const image=req.file.buffer.toString('base64')
    const {title, price}=req.body
    await productsRepo.create({title,price,image})
  res.redirect('/admin/products')
})

router.get('/admin/products/:id/edit', async (req, res)=>{

    const product=await productsRepo.getOne(req.params.id)
    res.send(productsEditTemplate({product}))
})

router.post('/admin/products/:id/edit', requireAuth, upload.single('image'), [requirePrice, requireTitle], async (req, res)=>{
  // const errors=validationResult(req);
  // const product=await productsRepo.getOneBy({req.params})
  // if(!errors.isEmpty()){
  //   return res.send(productsEditTemplate({errors, product}))
  // }
  const changes=req.body;
  if(req.file){
    changes.image=req.file.buffer.toString('base64')
  }
  try{
      await productsRepo.update(req.params.id, changes)
  }catch(err){
    res.send('Could not find item')
  }
res.redirect('/admin/products')
})

router.post('/admin/products/:id/delete', async (req, res)=>{
  await productsRepo.delete(req.params.id);
  res.redirect('/admin/products')
})

router.get('/admin/products',async (req, res)=>{
const products=await productsRepo.getAll();
res.send(indexProductsTemplate({products}))
                      })


router.post('/admin/products', requireAuth, async (req, res)=>{
const products=await productsRepo.getAll();
res.send(indexProductsTemplate({products}))
                      })

//FOR THE POST STUFF
// , [requirePrice, requireTitle]
// const errors=validationResult(req);
// if(!errors.isEmpty()){
// return res.send(productsEditTemplate({product, errors}))
// }



module.exports=router;
