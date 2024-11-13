import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary',()=>{
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    
    //runs a function before all of our test.
    beforeAll((done)=>{
        //asynch, sends a request but doesn't wait for response to comeback.
        loadProductsFetch().then(()=>{
            done();
        });
    });

    beforeEach(()=>{
        spyOn(localStorage, 'setItem')
        document.querySelector('.js-test-container').innerHTML = 
        //create div element to store the generateHTML for cartItem from orderSummary.js
        `
        <div class='js-order-summary'> </div>
        <div class='js-checkout-header'> </div>
        <div class='js-payment-summary'> </div>
        `;
        // once getItem was called it will be mocked/fake by the function below
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            },{ 
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }
            ]);
        })
        // retrieves the content of 'cart'
        //includes getItem which will call the function above
        //will pass an array of object to cart.
        loadFromStorage();
        //since we already have an array of object, we can now use this
        //it renders the page from the cart. (loops through the cart)
        renderOrderSummary();
    })

    it('displays the cart', ()=>{
        //beforeEach() hooks is used here
        
        //once rendered it will loop through the 'cart', and will generate 2 (cart-item container) div
        //since we use 2 objects on mocking the getItem, we are expecting to have 2items or 2objects


        //Tests done to check How the page looks
        expect(
            //returns Nodelist similar to arra 'a collection of elements'
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);

        //Checks if the Quantity of our first product is correct
        document.querySelector(`.js-product-quantity-${productId1}`)
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2')

        //Checks if the Quantity of our second product is correct
        document.querySelector(`.js-product-quantity-${productId2}`)
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1')

        //remove the rendered HTML after the testing
        document.querySelector('.js-test-container').innerHTML = ''
    })


    //Tests done to check How the page behaves 
    it('removes a product', ()=>{
        /*
        - we have use a function called removeFromCart on orderSummary
        - function from cart.js
        - what it was doing is that afterRemoving an item on the cart it saves (setItem) the data back to the localStorage, and that's what we are trying to avoid.
        - so, we will mock the setItem method.
        */
        
        //beforeEach Hook is used here

        //since there were only 2items, after deleting the first one we expecting 1item only
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            //returns Nodelist similar to arra 'a collection of elements'
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(1);

        //checks if the product1 has been deleted after deleting it
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null)
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null)

        //check after deleting, Is the cart array update?
        expect(cart.length).toEqual(1);
        //since we are deleting the product1 in this test
        expect((cart[0].productId)).toEqual(productId2)

        //remove the rendered HTML after the testing
        document.querySelector('.js-test-container').innerHTML = ''
    });
})