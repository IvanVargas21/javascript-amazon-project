//Save the data
//Generate the HTML
//Make it interactive
import {
  cart, 
  removeFromCart, 
  calculateCartQuantity, 
  updateQuantity
}  from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';


let cartSummaryHTML = '';
cart.forEach((cartItem)=>{
    //Retrieve productId from cart array
    const productId = cartItem.productId;
    //stores the product object(products.js) that has the same productId  (cart.js)
    let matchingProduct;
    
    //find on the products[] the one the matches the productId(cart.js)
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    })
    cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                 ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    `
})

console.log(cartSummaryHTML);

//get the div element where we are going to store the generated HTML for cartItem Info.
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

//get the delete link element
document.querySelectorAll('.js-delete-link').forEach((deletelink)=>{
    deletelink.addEventListener('click',() => {
        //kebab to camel case
        //access the dataset associated to each delete link
        const productId = deletelink.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        )
        container.remove();
    });
});

// function updateCartQuantity(cart){
//   //Calculate the Quantity
//   let cartQuantity=0;
//   cart.forEach((cartItem)=>{
//       cartQuantity += cartItem.quantity;
//   })
//   document.querySelector('.js-checkout-quantity').innerHTML = cartQuantity;
//   console.log(cartQuantity)
// }
// updateCartQuantity(cart);
//From code above to here: Using Modules
document.querySelector('.js-checkout-quantity').innerHTML = calculateCartQuantity();

//adds event listener to each update links from the page
document.querySelectorAll('.update-quantity-link').forEach((updatelink)=>{
  updatelink.addEventListener('click', ()=>{
    const productId = updatelink.dataset.productId;
    //get the cart-item-container of the product selected
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    //adds the class "is-editing-quantity
    //hides the quantity-label update-quantity-link
    //displays the quantity input and save-quantity-link
    container.classList.add("is-editing-quantity");
  })
})

function saveLinkFunction(){
  
}
  //adds event listener to each save links from the page.
  document.querySelectorAll('.save-quantity-link').forEach((saveLink)=>{
    saveLink.addEventListener('click', ()=>{
      const productId = saveLink.dataset.productId;
      //get the cart-item-container of the product selected
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      //remove the class "is-editing-quantity"
      //hides the quantity-input and save-quantity-link
      //displays quantity-label update-quantity-link
      container.classList.remove("is-editing-quantity");
      
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`).value;
      const newQuantity = Number(quantityInput);
      
      //Validation First before we add it on the cartItem.quantity
      //This is called EARLY RETURN
      if(newQuantity < 0 || newQuantity >= 1000){
        alert('Quantity must be at least 0 and less than 1000!');
        //breaks the program.
        return;
      }

      //finds the matchingProduct on cart, updates its quantity(quntityNumber), stores back to storage.
      updateQuantity(productId, newQuantity);
      
      //gets the element that contains the product quantity
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      //assigns to it the prev set matchingProduct.quantity.
      quantityLabel.innerHTML = newQuantity;
      //updtes the header at the top.
      document.querySelector('.js-checkout-quantity').innerHTML = calculateCartQuantity();
    })
  })
