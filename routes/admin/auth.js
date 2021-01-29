const express=require('express')
const usersRepo=require('../../repositories/users')
const productsRepo=require('../../repositories/products')
const signInTemplate=require('../../views/admin/auth/signin')
const signUpTemplate=require('../../views/admin/auth/signup')
const homePageTemplate=require('../../views/admin/homePage')

//express validator is like two libraries. its own and validator.js
//express validator santizes (massage/change incoming value) and then validate(make sure it meets requirements)
const {check, validationResult}=require('express-validator')
const {requireEmail, requirePassword, requirePasswordConfirmation, signinEmail, signinPassword}=require('../../validators')
//here is the errors. do witht hem what you will. returning or throwing new error with THIS


//THIS IS A SUBROUTER
const router=express.Router();

const app=express();


router.get('/signup', async (req, res)=>{
  return res.send(signUpTemplate({req}));

    //POST REQUEST GOES TO BODY OF REQ OBJECT======NEED A BODY PARSER TO HANDLE THIS
})


//MAKE A POST REQUEST TO CREATE A USER AND A POST REQUEST TO CREATE PRODUCTS app.POST('/PRODUCTS')
router.post('/signup', [requireEmail,
requirePassword,
requirePasswordConfirmation
], async (req, res)=>{
const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.send(signUpTemplate({req, errors}));
    //DESTRUCTURING THESE IS LIKE PASSING IN THE OBJECTS TO THE FUNCTION
  }

      console.log(errors)

    const {email, password, passwordConfirmation}=req.body;

  const user=await usersRepo.create({email, password});
  //the .userId can be called anything we want!
  req.session.userId=user.id;

        //POST REQUEST CREATES A RECORD OF SOME KIND USUALLY. image upload. user account.     //INFO APPENDED INTO THE BODY OF THE REQUEST OBJECT
console.log(req.session.userId)
  res.send(`Account Created! Back to Login Page
  <button><a href='/signin'>back</a></button>`)
  //request made to middleware then we run the callback or req.on
})

router.get('/signin', (req, res)=>{
//MAKE SURE TO MAKE THE METHOD POST.... NOW IT WONT BE IN QUERY STRING
  res.send(signInTemplate({req}));
    })
    //automatic browser submission whenever there is a button under the form
    //finds all input elements. browser collects all the info
    //when submitted it adds this to the query string

    //POST REQUEST GOES TO BODY OF REQ OBJECT======NEED A BODY PARSER TO HANDLE THIS
    router.post('/signin', [signinEmail, signinPassword],async (req, res)=>{
      const errors=validationResult(req);
      const {email, password}=req.body
        if(!errors.isEmpty()){
          return res.send(signInTemplate({req, errors}));
          //DESTRUCTURING THESE IS LIKE PASSING IN THE OBJECTS TO THE FUNCTION
        }
        const existingUser=await usersRepo.getOneBy({email});
      req.session.userId=existingUser.id
    //MAKE SURE TO MAKE THE METHOD POST.... NOW IT WONT BE IN QUERY STRING
    res.redirect('/admin/products')
        })

  router.get('/signout', (req, res)=>{
    req.session=null;
        //why not hard triple equal???? look this up!
        //MAKE SURE TO MAKE THE METHOD POST.... NOW IT WONT BE IN QUERY STRING
          res.send(`user is now signed out!`)
            })

router.get('/homepage', async (req, res)=>{
                   //why not hard triple equal???? look this up!
                  //MAKE SURE TO MAKE THE METHOD POST.... NOW IT WONT BE IN QUERY STRING
                  const products=await productsRepo.getAll();
                    res.send(homePageTemplate({req, products}))
                      })



module.exports=router;
