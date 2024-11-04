import dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },{
    id:'2',
    deliveryDays: 3,
    priceCents: 499
  },{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
]

export function getDeliveryOption(deliveryOptionId){
  //store the deliveryOption that matches with the that is associate w/ deliveryOptionId.
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if( option.id === deliveryOptionId ){
      deliveryOption = option;
    }
  })

  return deliveryOption || deliveryOptions(0);
}

//return true if the date is weeknd
function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
//take delivery option
//calculate the delivery date
//formats it
export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while(remainingDays > 0){
    deliveryDate = deliveryDate.add(1, 'day');

    //checks if a day in a weekday
    if(!isWeekend(deliveryDate)){
      remainingDays--;
    }
  }
   const dateString = deliveryDate.format('dddd,MMMM, D');
  return dateString;
}
