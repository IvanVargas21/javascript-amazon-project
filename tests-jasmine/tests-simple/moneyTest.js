import formatCurrency from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency')
//Basic Test Case
console.log('converts cents into dollars:')
if (formatCurrency(2095) === '20.95'){
    console.log('passed');
} else {
    console.log('failed');
}


//Edge Cases (not positive or negative)
console.log('works with 0:')
if(formatCurrency(0)=== '0.00'){
    console.log('passed')
}else{
    console.log('failed')
}


//Edge Cases (number that requires some rounding)
//Expected - 20.0005 but we can't have that
// we have to round it to 20.01
console.log('rounds up to the nearest cents (1):');
if(formatCurrency(2000.5)=== '20.01'){
    console.log('passed')
}else{
    console.log('failed')
}


//Edge Case
console.log('rounds up to the nearest cents (1):');
console.log('converts cents into dollars')
if(formatCurrency(2000.4)=== '20.00'){
    console.log('passed')
}else{
    console.log('failed')
}

 