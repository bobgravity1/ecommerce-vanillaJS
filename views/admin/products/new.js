const layout=require('../../layout')


const getErrorPrice=(errors, propertyName)=>{
    try{
      return errors.mapped()[propertyName].msg
    }
    catch(err){
      return '';
    }
  }

//YOU HAVE TO REMEMBER TO ADD A NAME TO EACH INPUT FIELD OR ELSE THe stuff you
//submit won't go to req.body
module.exports=({errors})=>{
  //this is saying to take a look at name of values. and put into query string url (transport info)
  //form enctype how to encode. the default type is enctype='application/x-www-form-urlencoded
  //the multipart/form-data enctype is the one that transfers images etc
  //body parser middleware only works with this url encoded enctype default
  return layout({content:`
    <div class="shell">
      <!-- Header -->
      <div id="header">
        <h1 id="logo"><a href="#">shoparound</a></h1>
        <!-- Cart -->
        <div id="cart"> <a href="/admin/products" class="cart-link">Admin Products</a>
        <hr>
          <span>Total: <strong>4</strong></span> &nbsp;&nbsp;</div>
        <!-- End Cart -->
        <!-- Navigation -->
        <div id="navigation">
          <ul>
            <li><a href="/homepage" >Home</a></li>
          </ul>
        </div>

    Admin New Products:
      <form class='signupsignin' enctype='multipart/form-data' method='POST'>
      <div class="control">
        <h1 class="subtitle">Add Product</h1>
        <a href="/admin/products" class="button is-primary">Products</a>
      </div>
    <input name='title' placeholder='title'>
  <p class='errors'>${getErrorPrice(errors, 'title')}</p>
    <input name='price' placeholder='price'>
      <p class='errors'>${getErrorPrice(errors, 'price')}</p>
      <input type='file' class='imgUpload' name='image' placeholder='image' />
          <button type='submit' class='signupButton search-submit'>submit</button>
          </form>
  `})
}
