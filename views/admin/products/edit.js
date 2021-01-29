const layout = require('../../layout');



const getErrorThree=(errors, propertyName)=>{
    try{
      return errors.mapped()[propertyName].msg
    }
    catch(err){
      return '';
    }
  }
module.exports = ({ product, errors }) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input value="${
                product.title
              }" class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getErrorThree(errors, 'title')}</p>
            </div>

            <div class="field">
              <label class="label">Price</label>
              <input value="${
                product.price
              }" class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getErrorThree(errors, 'price')}</p>
            </div>

            <div class="field">
              <label class="label">Image</label>
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Submit</button>
          </form>
        </div>
      </div>
    `
  });
};
