class Cart{
     
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey; 
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        //cart-oop avoid affecting our original cart'
        //referring to the object that this class will be used
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
          //if cart == null
        if(!this.cartItems){
          this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
                },{ 
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
                }];
        }
    }
    //To store the cart object on localStorage
    saveToStorage(){
        //Has 2 paramete
        //The name of whatever we want to save
        //Data we want to save
        //localStorage only accepts 'string'
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
    }
      /*
        * check if the product is already in the cart
        * if it is in the cart, increase the quantity
        * if it's not in the cart, add it to the cart.
      */
    addToCart(productId, itemQuantity){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });
      
        if(matchingItem){
            //the value we get from the the DOM are strings by default
            //matchingItem.quantity = item.quantity (on the cart)
            matchingItem.quantity = 2;//+= Number(itemQuantity);
        }else{
            this.cartItems.push({
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
        this.saveToStorage();
    }
    removeFromCart(productId){
        //new array
        const newCart = [];

        //push to new array all of the cartItem except the product we wanted to delete.
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });

        //assign it back to our array
        this.cartItems =  newCart;
        
        //save to localStorage
        this.saveToStorage();
    }
    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
    calculateCartQuantity(){
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem)=>{
            cartQuantity += cartItem.quantity;
        })
        return cartQuantity;
    }
    updateQuantity(productId, newQuantity){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        })
        matchingItem.quantity = newQuantity;
        //save the updated cart.quantity back to storage.
        this.saveToStorage();
    }

}

//this code will run w/ a diffent key on localStorage.
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log('Object-Oriented Programming');
console.log('Object 1')
console.log(cart)

console.log('Object 2');
console.log(businessCart);

console.log('Is instance of class Cart?')
console.log(businessCart instanceof Cart);

