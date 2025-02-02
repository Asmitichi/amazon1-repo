export const deliveryOptions=[
  {
  id: '1',
  deliveryDays: 7,
  priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 799
    },

];



export function getDeliveryOption(cartItem){
  let matchingDelivery;
    deliveryOptions.forEach((deliveryItem)=>{
      if(deliveryItem.id === cartItem.deliveryOptionsId){
        matchingDelivery = deliveryItem;
      }
    });
  return matchingDelivery || matchingDelivery[0];
}