import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkOutHeader.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js';
// import '../data/backend-practice.js';
import isSatSun from "./checkSatSun.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
//pass callback function
loadProducts(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})



const today = dayjs();
const futureDate = today.subtract(1, 'day');
const formattedDate = (futureDate.format('dddd'));
console.log( typeof formattedDate)

console.log(isSatSun(formattedDate));