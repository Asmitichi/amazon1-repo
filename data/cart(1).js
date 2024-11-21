import { deliveryOptions } from "./deliveryOption(1).js";



export let cart=JSON.parse(localStorage.getItem('cartName'))
||
 [{
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

export function saveToStorage(){
  localStorage.setItem('cartName',JSON.stringify(cart));
}

export function addToCart(productId,quant){
  let matchingItem;
  cart.forEach((item)=>{
    if (productId === item.productId){
      matchingItem = item;
    }
  });
  console.log(matchingItem);

  if(matchingItem){//here matchingItem will contain an object which is a truhthy value so we can just write matchingItem as a cond.
    matchingItem.quantity += quant;
  }
  // console.log(matchingItem);
  else{
    cart.push({
      productId,      // productId: productId
      quantity: quant,
      deliveryOptionsId: '1'
    });
  }
  console.log(cart);
  saveToStorage();
}  


export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveToStorage();
}