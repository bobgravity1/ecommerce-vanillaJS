const layout=require('../../layout')
const getErrorTwo=(errors, propertyName)=>{
    try{
      return errors.mapped()[propertyName].msg
    }
    catch(err){
      return '';
    }
  }

module.exports=({req, errors})=>{
  return layout({
    content:`
    <!-- Search -->

      <form class='signupsignin' method='POST'>
      <h2>Sign In:<span></span></h2>
      You have to be Signed in to an Admin Account to edit products!
  <H3 class='signupText'>Email</H3>
      <input class='signup' name='email' placeholder='' />
          <p class='errors'>  ${getErrorTwo(errors, 'email')}</p>
      <H3 class='signupText'>Password</H3>
        <input class='signup' name='password' placeholder='' />
              <p class='errors'>  ${getErrorTwo(errors, 'password')}</p>
        <button class='signupButton search-submit'>sign in</button>
        <p> <a href="/signup" class="bul">Don't Have an Account?</a><br />
          <a href="#" class="bul">Forgot Password?</a> </p>
      </form>
      </div>`
  })
}
