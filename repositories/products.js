const Repository=require('./repository')

class ProductsRepository extends Repository{}


module.exports=new ProductsRepository('products.json')
//DONT FORGET TO GIVE NAME OF JSON WHERE WE WANT TO SAVE INFO TO
//THIS IS TO AVOID SMALL TYPOS THAT CHANGE ENTIRE CODE LATER!!!
//fag..
