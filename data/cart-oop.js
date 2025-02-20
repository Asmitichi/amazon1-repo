import { addToCart } from "./cart(1).js";
import { deliveryOptions } from "./deliveryOption(1).js";

function Cart(localStorageKey){
  const cart={
    cartItems: undefined,
  
    loadFromStorage(){
      this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));
    
      if(!this.cartItems){
        this.cartItems=[{
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
    },
  
    saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    
    //Add to cart
    addToCart(productId,quant){
      let matchingItem;
      this.cartItems.forEach((item)=>{
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
        this.cartItems.push({
          productId,      // productId: productId
          quantity: quant,
          deliveryOptionsId: '1'
        });
      }
      // console.log(cart);
      this.saveToStorage();
    },
  
    //Remove from cart
    removeFromCart(productId){
      const newCart=[];
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
          newCart.push(cartItem);
        }
      });
      this.cartItems=newCart;
      this.saveToStorage();
    },
  
    //Update quantity using update button
    updateQuantity(productId, newQuantity){
      this.cartItems.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          cartItem.quantity=newQuantity;
          console.log(cartItem);
        }
        this.saveToStorage();
      });
    },
  
    //Updating deliveryOptionId
    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId === productId){
          matchingItem=cartItem
        }
      });
      matchingItem.deliveryOptionsId=deliveryOptionId;
      this.saveToStorage();
    }
  
  };

  return cart;
}

const cart= Cart('cartName-oop');
const businessCart= Cart('cartName-business');

//we did change here cause of testing phase that we will do later
cart.loadFromStorage();
businessCart.loadFromStorage();
cart.addToCart("54e0eccd-8f36-462b-b68a-8182611d9add",2);
console.log(cart);
console.log(businessCart);
















