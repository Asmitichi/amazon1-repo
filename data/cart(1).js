import { deliveryOptions } from "./deliveryOption(1).js";

export let cart;

//we did change here cause of testing phase that we will do later
loadFromStorage();

export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cartName'));

  if(!cart){
    cart=[{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId: '1'
      },
      {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId: '2'
      }
    ];
  }
}



function saveToStorage(){
  localStorage.setItem('cartName',JSON.stringify(cart));
}

//Add to cart
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

//Remove from cart
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

//CalculateCartQuantity changes from ex 14e
export function CalculateCartQuantity(){
  let cartQuantity=0;
  cart.forEach((cartItem)=>{
    cartQuantity+=cartItem.quantity;
  })
  return cartQuantity;
}


//Update quantity using update button
export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      cartItem.quantity=newQuantity;
      console.log(cartItem);
    }
    saveToStorage();
  });
}


//Updating deliveryOptionId
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem=cartItem
    }
  });
  matchingItem.deliveryOptionsId=deliveryOptionId;
  saveToStorage();
}