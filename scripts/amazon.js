//Module 
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
//Save the data
//This is called DATA STRUCTURES - it organizes the data
//Combine All the strings together
//Accumulator Pattern

//remember that it sends a request from our backend
//it will taketime for the request to travel 
//cause: at first products will not be loaded, have to refresh page.
loadProducts(renderProductsGrid);

function renderProductsGrid(){
  let productsHTML ='';

  products.forEach((product)=>{
      productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
              ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class= "product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}
            
            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `
  })

  document.querySelector('.js-products-grid').innerHTML += productsHTML;

  // //updates the page rather than updates the cart
  // //should stay on this page. 
  // function updateCartQuantity(){
  //   //Calculate the Quantity
  //   let cartQuantity=0;
  //   cart.forEach((cartItem)=>{
  //       cartQuantity += cartItem.quantity;
  //   })
  //   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  //   console.log(cartQuantity); 
  // }
  // //Update immediately the Element that display CartQuantity when the page loads.
  // updateCartQuantity();
  //From Code Above to here: Using Modules
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();


  function addToCartMessage(productId, addedMessage, addedMessageTimeouts) {
    // Add the class to show the message immediately
    addedMessage.classList.add("added-to-cart-visible");

    // Check if there's a previous timeout for this product and clear it
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    // Set a new timeout to remove the class after 2 seconds
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);

    // Save the new timeout ID for this product
    addedMessageTimeouts[productId] = timeoutId;
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
      button.addEventListener('click', ()=>{
          //Retrieves the productId
          // kebab-case converted into camelCase
          //accesses the custom data-product-id attribute in each button
          //Destructuring Applied
          const {productId} = button.dataset;
          
          //Retrieves the quantitySelector value.
          const productSelector = document.querySelector(`.js-quantity-selector-${productId}`)

          //retrieves the quantity value from productSelector
          const itemQuantity = productSelector.value;
          console.log(itemQuantity);
          // console.log(typeof itemQuantity);
          
          //Uses Retrieved productId, itemQuantity as parameter for this function
          //this function was for adding product
          //checks if product exists, 
          //if yes, productSelector value will be added to the quantity property of product object.
          //if no the object will be pushed on cart array.
          addToCart(productId, itemQuantity);
        
          document.querySelector('.js-cart-quantity').innerHTML=calculateCartQuantity();
                    
            
          // An object to store timeout IDs for each product
          const addedMessageTimeouts = {};
          //Retrieves the added to cart button associated to selected button
          const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
          addToCartMessage(productId, addedMessage, addedMessageTimeouts);
        })
  });

}