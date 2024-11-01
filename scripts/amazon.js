//Module 
import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
//Save the data
//This is called DATA STRUCTURES - it organizes the data
//Combine All the strings together
//Accumulator Pattern
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
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
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

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click', ()=>{
        // kebab-case converted into camelCase
        //accesses the custom data-product-id attribute in each button

        //Destructuring Applied
        const {productId} = button.dataset;
        //we'll use productId we retrieved above, it was the productId associated to the buttont that we select.
        const productSelector = document.querySelector(`.js-quantity-selector-${productId}`)
        //check if the product is already in the cart
        //if it is in the cart, increase the quantity
        //if it's not in the cart, add it to the cart.

        //retrieves the quantity value from productSelector
        const itemQuantity = productSelector.value;
        console.log(itemQuantity);
        //the value we get from the the DOM are strings by default
        // console.log(typeof itemQuantity);

        let matchingItem;
        cart.forEach((item)=>{
            if(productId === item.productId){
                matchingItem = item;
            }
        });

        if(matchingItem){
            //matchingItem.quantity = item.quantity (on the cart)
            matchingItem.quantity += Number(itemQuantity);
        }else{
            cart.push({
                //Since productId is both the property name and the variable name, it can be use shorthand.
                productId,
                //convert it to number first
                quantity: Number(itemQuantity),
            });
        }
            //Calculate the Quantity
            let cartQuantity=0;
            cart.forEach((item)=>{
                cartQuantity += item.quantity;
            })
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
                    
            
            // An object to store timeout IDs for each product
            const addedMessageTimeouts = {};
            const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
            function addToCart(productId) {
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
            
            addToCart();
            console.log(cartQuantity); 
            console.log(cart)
            

      })
})

