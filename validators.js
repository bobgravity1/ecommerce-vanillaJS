//there is no handling of the errors oar anything done with them unless we specify to.
// the validator just// /tells us what the errors are-----SOLUTION: IF(!ERRORS.ISeMPTY())



const {check}=require('express-validator')
const usersRepo=require('./repositories/users')
//IF WE DONT ACCOUNT FOR THE ERRORS IN VALIDATOR
//does not stop the function from running
//be sure to check documentation
//.isAscii() .isFloat() .toDate() etc
//we only care about these two functions from express-validation
//we would have to do expressvalidator.check otherwise if we didn't destructure it
module.exports={
  requireTitle:check('title').trim()
  .isLength({min:3, max:20})
  .withMessage('must be between 3 and 20 characters'),
  requirePrice:check('price')
  .trim()
  .toFloat()
  .isFloat({min:1})
  .withMessage('must be great than 1'),
  requirePrice:check('price').trim()
  .isLength({min:3, max:20})
  .withMessage('must be between 3 and 20 characters!'),
  requireEmail:check('email')
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage('must be a valid email')
  .custom(async email=>{
    const existingUser=await usersRepo.getOneBy({email});
    console.log(existingUser)
    if(existingUser){
      //MAKE SURE TO RETURN.BUT WE STILL THROUGH THE REST OF THE FUNCTION AFTER MIDDLEWARE
      throw new Error ('email in use!')
    }
  }),
  requirePassword:check('password')
  .trim()
  .isLength({min:3,max:20})
  .withMessage('password must be between 20 and 30 characters!'),
  requirePasswordConfirmation:check('passwordConfirmation')
  .trim()
  .isLength({min:3,max:20})
  .withMessage('password must be between 20 and 30 characters!')
  .custom((passwordConfirmation, {req})=>{ //THE {REQ} IS A PROPERTY ON A BIG OBJECT
    //SECOND ARGUMENT TO EXPRESS VALIDATOR IS A MASSIVE THING. WE JUST WANT THE REQ PART!. CAN ALSO HAVE RES ETC
    if(passwordConfirmation!==req.body.password){
      throw new Error('passwords must match!')
    }
    return true;
}),
signinEmail:  check('email')
.trim()
.normalizeEmail()
.isEmail()
.withMessage('not a valid email!')
.custom( async email=>{
    const existingUser=await usersRepo.getOneBy({email:email});
    if(!existingUser){
      throw new Error ('Email not found!')
    }
}),
signinPassword:check('password')
.trim()
.custom( async (password, {req})=>{
  const existingUser=await usersRepo.getOneBy({email:req.body.email});//?!??!?!?!?
  const validPassword=await usersRepo.comparePasswords(password, existingUser.password);
  if(!validPassword){
    throw new Error('incorrect password')
  }

  })
}
