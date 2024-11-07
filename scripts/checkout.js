import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkOutHeader.js";
import '../data/cart-oop.js';
import isSatSun from "./checkSatSun.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();


const today = dayjs();
const futureDate = today.subtract(1, 'day');
const formattedDate = (futureDate.format('dddd'));
console.log( typeof formattedDate)

console.log(isSatSun(formattedDate));