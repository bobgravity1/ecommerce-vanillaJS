// different servers running on different machines so we cant store on hard drive normally
// but for sake of this project we are doing local host storage.
//writing a data store on our own
//classes and inheritence for our users/products etc.
//this approach might not be best for production grade projects
const fs=require('fs')
const crypto=require('crypto')
const util=require('util');
const scrypt=util.promisify(crypto.scrypt)
const Repository=require('./repository')
// util.promisify('crypto');
//this is class that handles all users in repo. CAPITAL LETTERS
class UsersRepository extends Repository{
  //constructor is always after the class
  async create(attrs){
    //ATTRS IS THE NEW RECORD WE ARE CREATING.
    //ATTRS.ID NOT RECORDS.ID!!!
    attrs.id=this.randomId();
    const salt=crypto.randomBytes(4).toString("hex");
    //we promisify scrypt so its ready before we move on.
    //we do NOT NEED A CALLBACK NOW WITH (REQ. BUFF=>{
    // HASHED.TOSTRING() ETC
    const buff=await scrypt(attrs.password, salt, 64);
    const records=await this.getAll();
    const record={...attrs,
      password:`${buff.toString('hex')}.${salt}`
      };
      records.push(record)
    await this.writeAll(records);
    return record; //this is so we return whole attrs object
  }
  async comparePasswords(suppliedPassword, savedPassword){

    const [buff, salt]=savedPassword.split('.');
    const hashedSupplied=await scrypt(suppliedPassword, salt, 64);
    return hashedSupplied.toString('hex')===buff
  }
}
//WE NEED TO PUT THIS IN A TEST ASYNC FUNCTION BECAUSE GET
// ALL IS AN ASYNC FUNCTION THAT RETURN PROMISES
//CANT ALWAYS DO TOP LEVEL ASYNC AWAIT
// const tester=async()=>{

  // const user=await repo.getOneBy({id:''})

//this is best way so we dont have to keep rewriting
module.exports=new UsersRepository('users.json');

//dont forget to press CD to current directory then node users.js in the terminal CL
