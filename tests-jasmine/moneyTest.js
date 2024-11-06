import formatCurrency from "../scripts/utils/money.js";

describe('test suite: Format Currency', ()=>{
   it('Converts cents into dollars:', ()=>{
    // instead of using an if stament
    //compare the returned value of function to an expected value.
    expect(formatCurrency(2095)).toEqual('20.95');
   })

   it('Works with 0:', ()=>{
    expect(formatCurrency(0)).toEqual('0.00')
   })

    describe('rounding', ()=>{
        it('rounds up to the nearest cent',()=>{
            expect(formatCurrency(2000.5)).toEqual('20.01')
        })
        it('round down to the nearest cent', ()=>{
            expect(formatCurrency(2000.4)).toEqual('20.00')
        })
        
    })
})

