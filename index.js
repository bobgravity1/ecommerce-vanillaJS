//node library
const express=require('express');
const authRouter=require('./routes/admin/auth')
const productsAdminRouter=require('./routes/admin/products')
const productsRouter=require('./routes/users/products')
const cartsRouter=require('./routes/users/carts')
//this processes the body of the req from a buffer into a proper readable content type
//manually can do bodyparser and do req.body=formData;   formData[key]=value;
// if(req.body ==='POST') // TRIPLE=== BECAUSE ITS A STRING LITERAL
const bodyParser=require('body-parser')
//this bodyparser (url encoded) is not substantial for dealing
//with image uploads. we essentially need to parse the multi-part form as well
//INSTEAD WE USE MULTER
const app=express();
//ALL ROUTE HANDLERS ASSOCIATE WITH THIS APP OBJECT

const usersRepo=require('./repositories/users.js')
// req a cookie from server. server gives cookie. please include this with
// every followup requrest you make to me
//3rd party package library that manages and handles cookie info
const cookieSession=require('cookie-session')
//if i try copy and pasting the cookie url to query string it will say "must log in first to see this"
//you can trick broswer by taking all the cookie information
//take cookie and throw into requestion to trick browser// cookie is key to identifying self
//*****there is a request to an endpoint/router called SESSION******
//PERSON WITH ID OF 1 IS MAKING REQUEST. THEN GIVES APPROPRIATE INFO
///IF EMAIL AND PASSWORD MATCH. THE SERVER GIVES A cookie WHICH STORES SOME INFORMATION
//cookie is just a small string of characters
//core of authentication
// /this allows us to identify who is making the request


//MIDDLEWARE USES NEXT();
//immediately runs appropriate callback method. WE NEED MIDDLEWARE TO HANDLE IT FIRST
//BEFORE RUNNING ANY ADDITIONAL LOGIC //(req, res, next)   ------really a basic funtion but next()
// no promises
// uses next because we didn't have promises
//ROUTER OBJECT IS APP

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
  //really just adds a session property to req object
  // req.session....we can add as many properties to this object
  keys: ['q1g83j2xo'] //this is used to encrypt so user can't decipher
  // or make changes to info stored inside here
  // 24 hours
}))
app.use(authRouter)
app.use(productsAdminRouter)
app.use(productsRouter);
app.use(cartsRouter);
//REQUEST SUBMITTED TO '/' or '/signout etc...' PATH/ROUTE
//this is a local port. not from DNS server request etc.
const port=3012;

//info about user is req. send some info back to broswer is res.
    //GET REQUEST INFO ADDED TO QUERY string

// MAKE SURE TO MAKE THE METHOD POST.... NOW IT WONT BE IN QUERY STRING
//     automatic browser submission whenever there is a button under the form
//     finds all input elements. browser collects all the info
    //when submitted it adds this to the query string
    //FALSEY VALUE


//local port instead of DNS with IP etc.
//if someone makes a GET request to path/route '/' then run this function
// the router is responsible for handling. (router object)
//formulate a response with res...
app.listen(port, ()=>{
  console.log(`listening on ${port}`);
})
