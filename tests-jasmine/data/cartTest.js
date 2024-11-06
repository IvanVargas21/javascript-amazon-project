import { addToCart, cart } from "../../data/cart.js";
import { loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', ()=>{
    it('adds an existing product to the cart', ()=>{
        spyOn(localStorage, 'setItem');
        // whenever getItem is called it will return'[]' (an empty array in string form)
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        })
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1);
        // checks how many was localStorage.setItem was called in the code above
        //It is expected to be called once, so we'll give t a number 1
        //method only works if this object is 'spyOn'
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        // checks if the first item in array is equal to id above
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2)
    });

    it('adds a new product to the cart',()=>{
        spyOn(localStorage, 'setItem');
        // whenever getItem is called it will return'[]' (an empty array in string form)
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        })
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1);
        // checks how many was localStorage.setItem was called in the code above
        //It is expected to be called once, so we'll give t a number 1
        //method only works if this object is 'spyOn'
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        // checks if the first item in array is equal to id above
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    })
})
