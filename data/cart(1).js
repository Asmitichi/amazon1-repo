import { deliveryOptions } from "./deliveryOption(1)";

export let cart=[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  Quantity: 2,
  deliveryOptionsId: '1'
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  Quantity: 1,
  deliveryOptionsId: '2'
}
];

export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
}