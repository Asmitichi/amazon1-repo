import { CalculateCartQuantity } from "../../data/cart(1).js";

//Header in checkout page that shows total no .of items in checkout page  
export function renderCheckoutHeader(){
  const cartQuantity= CalculateCartQuantity();
    document.querySelector('.js-return-to-home-link')
      .innerHTML=`${cartQuantity} items`;
}