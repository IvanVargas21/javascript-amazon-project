import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkOutHeader.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js';
// import '../data/backend-practice.js';
import isSatSun from "./checkSatSun.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { loadCart } from "../data/cart.js";

//Converts callback to promises
Promise.all([
  //when created, runs the function immediately
  new Promise((resolve)=>{
    //runs the function after loadProducts is finished.
    loadProducts(()=>{
        resolve('value1'); 
    });
  }),
  new Promise((resolve)=>{
    loadCart(()=>{
        resolve();
    });
  })
  //adds a next step to a promise
]).then((values)=>{
  console.log(values)
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
)

/*
//when created, runs the function immediately
new Promise((resolve)=>{
    //runs the function after loadProducts is finished.
    loadProducts(()=>{
        resolve(); 
    });
    

}).then(()=>{
  return new Promise((resolve)=>{
  loadCart(()=>{
      resolve();
  });
})
		
}).then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})

//pass callback function
// loadProducts(()=>{
//     //function will run after the cart is loaded.
//     loadCart(()=>{
//         renderCheckoutHeader();
//         renderOrderSummary();
//         renderPaymentSummary();
//     })

// })



const today = dayjs();
const futureDate = today.subtract(1, 'day');
const formattedDate = (futureDate.format('dddd'));
// console.log( typeof formattedDate)

// console.log(isSatSun(formattedDate));
*/