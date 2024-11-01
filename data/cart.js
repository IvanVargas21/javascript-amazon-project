//choose which variable can be accessed outside of this file.
export const cart = [];

/*
  * check if the product is already in the cart
  * if it is in the cart, increase the quantity
  * if it's not in the cart, add it to the cart.
*/
export function addToCart(productId, itemQuantity){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
  
    if(matchingItem){
        //the value we get from the the DOM are strings by default
        //matchingItem.quantity = item.quantity (on the cart)
        matchingItem.quantity += Number(itemQuantity);
    }else{
        cart.push({
            //Since productId is both the property name and the variable name, it can be use shorthand.
            productId,
            //the value we get from the the DOM are strings by default
            //convert it to number first
            quantity: Number(itemQuantity),
        });
    }
  }