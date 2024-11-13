import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkOutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
//import '../data/cart-class.js';
// import '../data/backend-practice.js';
import isSatSun from "./checkSatSun.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { loadCart } from "../data/cart.js";

//returns a promise
async function loadPage(){
  //inside any code that may cause an error
  try{
    //creates new error
    //throw 'error1'

    //waits for this line to finish, before going to the next line.
    await loadProductsFetch( );

    const value = await new Promise((resolve, reject)=>{
      //throw 'error1'
      loadCart(()=>{
        //reject('error3');
        resolve('value3');
      });
    })

  } catch(error){
    console.log('Unexpected error. Please try again later.');
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
//passes return value in then parameter
loadPage();
/*
//Converts callback to promises
Promise.all([
  //returns a promises which we can use in Promise.all()
  loadProductsFetch()
  ,
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
*/

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