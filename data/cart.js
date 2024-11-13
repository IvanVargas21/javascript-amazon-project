//choose which variable can be accessed outside of this file.
//obj
export let cart;

loadFromStorage();

export function loadFromStorage (){
   cart = JSON.parse(localStorage.getItem('cart'));

//if cart == null
if(!cart){
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    },{ 
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }
    ];
}
}

//To store the cart object on localStorage
function saveToStorage(){
    //Has 2 paramete
    //The name of whatever we want to save
    //Data we want to save
    //localStorage only accepts 'string'
    localStorage.setItem('cart', JSON.stringify(cart))
}
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
        matchingItem.quantity = 2;//+= Number(itemQuantity);
    }else{
        cart.push({
            //Since productId is both the property name and the variable name, it can be use shorthand.
            productId,
            //the value we get from the the DOM are strings by default
            //convert it to number first
            quantity:1 //Number(itemQuantity)
            //for new product, initial deliveryOption is 1
            ,deliveryOptionId: '1'
        });
    }
    //save to localStorage
    saveToStorage();
  }

  export function removeFromCart(productId){
    //new array
    const newCart = [];

    //push to new array all of the cartItem except the product we wanted to delete.
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    //assign it back to our array
    cart =  newCart;
    
    //save to localStorage
    saveToStorage();
  }

  export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    })
    return cartQuantity;
  }

  export function updateQuantity(productId, newQuantity){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })
    matchingItem.quantity = newQuantity;
    //save the updated cart.quantity back to storage.
    saveToStorage();
  }

  //find the product we want to update in the cart
  //update the deliveryOptionId of the product
  export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }

  //loads the Cart from the backend
  export function loadCart(fun){
    const xhr = new XMLHttpRequest();
  
    //function, after the response has loaded.
    xhr.addEventListener('load', ()=>{
        console.log(xhr.response);
  
      //after create products[] at the top
      //call the renderProductsGrid
      fun();
    });
    
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    //XML Http Request
    //asynchronous
    xhr.send();
  }