const express=require('express');
const router=express.Router();
const productsRepo=require('../../repositories/products')
const usersIndexTemplate=require('../../views/users/homePageMockup')

router.get('/', async (req,res)=>{
const products=await productsRepo.getAll();
res.send(usersIndexTemplate({products}));
})



module.exports=router;
