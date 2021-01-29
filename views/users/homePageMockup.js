const layout=require('../layout')
//PLEASE NOTE THE OTHER WAY OF DOING A PARAM request//
//INPUT HIDDEN VALUE=PRODUCT.ID etc



module.exports=({req, products})=>{
  const renderedProducts = products
    .map(product => {
      return `
      <li> <a href="#"><img src="data:image/png;base64, ${product.image}"/></a>
        <div class="product-info">
          <h3>Spring Sale</h3>
          <div class="product-desc">
            <h4>MEN’S</h4>
            <p>${product.title}<br /></p>
            <strong class="price">$${product.price}</strong> </div>
              <form action='/cart/products' method='POST'>
            <input hidden name='productId' value=${product.id} />
            <button class='cartAdder signupButton search-submit'>Add to Cart</button>
            </form>
        </div>
      </li>







      <tr>
        <td></td>
        <td></td>
        <td>

</a>
      </tr>
    `;
    })
    .join('');
    return layout({
      content:`
    // <h1 class='user'>This is the USER PAGE. NOT ADMIN</h1>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="/signin">Admin Edit Products</a>
  </div>
      <div class="shell">
        <!-- Header -->
        <div id="header">
          <h1 id="logo"><a href="#">shoparound</a></h1>
          <!-- Cart -->
          <div id="cart"> <a href="/cart" class="cart-link">Your Shopping Cart</a>
          <hr>
            <span>Items: <strong>4</strong></span> &nbsp;&nbsp; <span>Total: <strong>$250.99</strong></span> </div>
          <!-- End Cart -->
          <!-- Navigation -->
          <div id="navigation">
            <ul>
              <li><a href="/" >Home</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">My Account</a></li>
              <li><a href="#">The Store</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <!-- End Navigation -->
        </div>
        <!-- End Header -->
        <!-- Main -->
        <div id="main">
          <div class="cl">&nbsp;</div>
          <!-- Content -->
          <div id="content">
            <!-- Content Slider -->
            <div id="slider" class="box">
              <div id="slider-holder">
                <ul>
                  <li><a class='banner' href="#"><img src="/images/place.png" alt="" /></a></li>
                  <li><a href="#"><img src="/images/slide2.jpg" alt="" /></a></li>
                  <li><a href="#"><img src="/images/slide3.jpg" alt="" /></a></li>
                <li><a href="#"><img src="/images/slide4.jpg" alt="" /></a></li>
                </ul>
              </div>
              <div id="slider-nav"> <a href="#" class="active">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> </div>
            </div>
            <!-- End Content Slider -->
            <!-- Products -->
            <div class="products">
              <div class="cl">&nbsp;</div>

                <ul>
  ${renderedProducts}
              </ul>
              <div class="cl">&nbsp;</div>
            </div>
            <!-- End Products -->
          </div>
          <!-- End Content -->
          <!-- Sidebar -->
          <div id="sidebar">
            <!-- Search -->
            <div class="box search">
              <h2>Search by <span></span></h2>
              <div class="box-content">
                <form action="#" method="post">
                  <label>Keyword</label>
                  <input type="text" class="field" />
                  <label>Category</label>
                  <select class="field">
                    <option value="">-- Select Category --</option>
                  </select>
                  <div class="inline-field">
                    <label>Price</label>
                    <select class="field small-field">
                      <option value="">$10</option>
                    </select>
                    <label>to:</label>
                    <select class="field small-field">
                      <option value="">$50</option>
                    </select>
                  </div>
                  <input type="submit" class="search-submit" value="Search" />
                  <p> <a href="#" class="bul">Advanced search</a><br />
                    <a href="#" class="bul">Contact Customer Support</a> </p>
                </form>
              </div>
            </div>
            <!-- End Search -->
            <!-- Categories -->
            <div class="box categories">
              <h2>Categories <span></span></h2>
              <div class="box-content">
                <ul>
                  <li><a href="#">Category 1</a></li>
                  <li><a href="#">Category 2</a></li>
                  <li><a href="#">Category 3</a></li>
                  <li><a href="#">Category 4</a></li>
                  <li><a href="#">Category 5</a></li>
                  <li><a href="#">Category 6</a></li>
                  <li><a href="#">Category 7</a></li>
                  <li><a href="#">Category 8</a></li>
                  <li><a href="#">Category 9</a></li>
                  <li><a href="#">Category 10</a></li>
                  <li><a href="#">Category 11</a></li>
                  <li><a href="#">Category 12</a></li>
                  <li class="last"><a href="#">Category 13</a></li>
                </ul>
              </div>
            </div>
            <!-- End Categories -->
          </div>
          <!-- End Sidebar -->
          <div class="cl">&nbsp;</div>
        </div>
        <!-- End Main -->
        <!-- Side Full -->
        <div class="side-full">
          <!-- More Products -->

          <!-- End More Products -->
          <!-- Text Cols -->
          <div class="cols">
            <div class="cl">&nbsp;</div>
            <div class="col">
              <h3 class="ico ico1">Donec imperdiet</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet, metus ac cursus auctor, arcu felis ornare dui.</p>
              <p class="more"><a href="#" class="bottoma bul">Lorem ipsum</a></p>
            </div>
            <div class="col">
              <h3 class="ico ico2">Donec imperdiet</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet, metus ac cursus auctor, arcu felis ornare dui.</p>
              <p class="more"><a href="#" class="bottoma bul">Lorem ipsum</a></p>
            </div>
            <div class="col">
              <h3 class="ico ico3">Donec imperdiet</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet, metus ac cursus auctor, arcu felis ornare dui.</p>
              <p class="more"><a href="#" class="bottoma bul">Lorem ipsum</a></p>
            </div>
            <div class="col col-last">
              <h3 class="ico ico4">Donec imperdiet</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet, metus ac cursus auctor, arcu felis ornare dui.</p>
              <p class="more"><a href="#" class="bottoma bul">Lorem ipsum</a></p>
            </div>
            <div class="cl">&nbsp;</div>
          </div>
          <!-- End Text Cols -->
        </div>
        <!-- End Side Full -->
        <!-- Footer -->
        <div id="footer">
          <p class="left"> <a href="#">Home</a> <span>|</span> <a href="#">Support</a> <span>|</span> <a href="#">My Account</a> <span>|</span> <a href="#">The Store</a> <span>|</span> <a href="#">Contact</a> </p>
          <p class="right"> &copy; 2020 Design by Robert O'Toole </p>
        </div>
        <!-- End Footer -->
      </div>
      `
    })


}
