import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js"; 
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
  //total price of the products on the cart
  let productPriceCents = 0;
  //Shipping & Handling
  let shippingPriceCents = 0;
  cart.forEach((cartItem)=>{
    //gets the matching product of the cartItem
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    //gets the deliveryOptions, based on the selected deliveryOptionId
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  })
  //total before tax
  const totalBeforeTaxCents = productPriceCents+shippingPriceCents;
  //estimated tax(10%)
  const taxCents = totalBeforeTaxCents * 0.1;
  //order total
  const totalCents = totalBeforeTaxCents + taxCents;
  console.log(totalBeforeTaxCents)

  //totalCartQuantity
  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
  })

  const paymentSummaryHTML = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">
      $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
   Place your order
</button>

  `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  document.querySelector('.js-place-order')
  .addEventListener('click', async () => {
    try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          //what type of data we are sending on our backend
          'Content-Type':'application/json'
        },
        //can't send an object directly.
        //convert it into JSON string.
        body: JSON.stringify({
          cart: cart
        })
      });
  
      const order = await response.json();
      addOrder(order);
    }catch(error){
      console.log('Unexpected Error. Try again later.')
    } 

    window.location.href = 'orders.html';
  })
}

