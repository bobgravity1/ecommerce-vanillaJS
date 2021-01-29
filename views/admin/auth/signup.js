const layout=require('../../layout')
const getError=(errors, propertyName)=>{
    try{
      return errors.mapped()[propertyName].msg
    }
    catch(err){
      return '';
    }
    //gives objec
    //then sub object of propertyname and then it gives the
    //string we care about with .msg
  //   //errors:[
  //   {value:
  //   msg:
  // param:}

    //mapped() is from the express-validator library.
    //this is the way of handling all of the errors.

  }


module.exports=({req, errors})=>{
  if(!req.session.userId){
    return layout({content:`you are signed out:</p>
      <form class='signupsignin' method='POST'>
      <H3 class='signupText'>Email:</H3>
      <input name='email' placeholder='email' />
       <p class='errors'>${getError(errors, 'email')}</p>
      <H3 class='signupText'>Password:</H3>
        <input name='password'  placeholder='password' />
            <p class='errors'>${getError(errors, 'password')}</p>
      <H3 class='signupText'>Password Confirmation:</H3>
          <input name='passwordConfirmation' placeholder='passwordConfirmation' />
         <p class='errors'>  ${getError(errors, 'passwordConfirmation')}</p>
          <button class='signupButton search-submit'>sign up</button>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/signin">Already have Account? Sign In!</a>
          <a class="dropdown-item" href="#">Forgot password?</a>
        </div>
      </form>

      </div>`
  })
}
else{
return layout({content:`
  <div>${req.session.userId}

  <form class='signupsignin' method='POST'>
  <H3 class='signupText'>Email</H3>
  <input name='email' placeholder='email' />
   <p class='errors'>${getError(errors, 'email')}</p>
  <H3 class='signupText'>Password</H3>
    <input name='password'  placeholder='password' />
        <p class='errors'>${getError(errors, 'password')}</p>
  <H3 class='signupText'>Password Confirmation</H3>
      <input name='passwordConfirmation' placeholder='passwordConfirmation' />
     <p class='errors'>  ${getError(errors, 'passwordConfirmation')}</p>
    <button class='signupButton search-submit'>sign up</button>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="/signin">Already have Account? Sign In!</a>
      <a class="dropdown-item" href="#">Forgot password?</a>
    </div>
  </form>

  </div>`
})
}
}
