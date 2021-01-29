
const layout = require('../../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map(product => {
      return `
      <tr>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>
<a href="/admin/products/${product.id}/edit">
            <button class="button is-link">
              Edit
            </button>
</a>
        </td>
        <td>
        <form method='POST' action='/admin/products/${product.id}/delete'>
          <button class="button is-danger">Delete</button>
          </form>
        </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
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
          <form action='/homepage' method='GET'>
            <li><a href="/homepage" >Home</a></li>
            </form>
          </ul>
        </div>
    <div class='signupsignin' method='POST'>
      <div class="control">
        <h1 class="subtitle">Products</h1>
        <a href="/admin/products/new" class="button is-primary">New Product</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
      </div>
      </div>
    `
  });
};
