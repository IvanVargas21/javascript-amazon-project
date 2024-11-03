//Save the data
//Generate the HTML
//Make it interactive
import {
  cart, 
  removeFromCart, 
  calculateCartQuantity, 
  updateQuantity,
  updateDeliveryOption
}  from '../data/cart.js';
import {products} from '../data/products.js';
import formatCurrency from './utils/money.js';
//name export
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
//default export 
import dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
//Hello External Library
// hello();
//DayJS External library
const today = dayjs()
const deliveryDate = today.add(7, 'days');


console.log(deliveryDate);
console.log(deliveryDate.format('dddd,MMMM,D'));

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
    
    //get the deliveryOptionId associated to this cartItem
    const deliveryOptionId = cartItem.deliveryOptionId;
    //store the deliveryOption that matches with the that is associate w/ deliveryOptionId.
    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if( option.id === deliveryOptionId ){
        deliveryOption = option;
      }
    })

     //GetCurrent Date
     const today = dayjs();
     //Add the deliveryDays associated to each deliveryOption
     const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
     //Change Format to Day(Monday-Sunday), Month, Day(1-31)
     const dateString = deliveryDate.format('dddd,MMMM,D');

    cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                ${deliveryOptionsHTML(matchingProduct, cartItem)};
              </div>
            </div>
        </div>
    `
})

//function for generating HTML
//Loop through delivery Options
//For each option, generate some HTML
//Combine the HTML together
function deliveryOptionsHTML(matchingProduct, cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{
    //GetCurrent Date
    const today = dayjs();
    //Add the deliveryDays associated to each deliveryOption
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    //Change Format to Day(Monday-Sunday), Month, Day(1-31)
    const dateString = deliveryDate.format('dddd,MMMM,D');

    const priceString = deliveryOption.priceCents === 0? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} - `
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html+=`
   <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio"
        ${isChecked ? 'checked': ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
   `
  })
  return html;
}


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

  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
    })
  })
