import { cart, removeFromCart, CalculateCartQuantity ,updateQuantity } from "../data/cart(1).js"; 
import { products } from "../data/products(1).js"; 
import { formatCurrency } from "./utils/money.js";

let checkoutHTML="";
cart.forEach((cartItem)=>{
  let matchingProduct;
  // const products_jsID=products.id;
  products.forEach((productsItem)=>{
    if(productsItem.id === cartItem.productId){
      matchingProduct=productsItem;
    }
  });
  checkoutHTML+=`
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save" data-product-id="${matchingProduct.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                  <p class="alert-msg js-alert-msg-${matchingProduct.id}"></p>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"  
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
  
  `
});

document.querySelector('.js-order-summary')
  .innerHTML=checkoutHTML;

//Header in checkout page that shows total no .of items in checkout page  
function checkoutHeader(){
  const cartQuantity= CalculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML=`${cartQuantity} items`;
}

checkoutHeader();


//Delete link
document.querySelectorAll('.js-delete')
  .forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
      const productId=deleteLink.dataset.productId;
      removeFromCart(productId); 
      const container=document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      checkoutHeader();
    });
  });

//Update link
document.querySelectorAll('.js-update')
  .forEach((updateLink)=>{
    updateLink.addEventListener('click',()=>{
      const productId=updateLink.dataset.productId;
      console.log(productId);
      const container=document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

//Save link
  document.querySelectorAll('.js-save')
  .forEach((saveLink)=>{
    saveLink.addEventListener('click',()=>{
      const productId=saveLink.dataset.productId;
      const quantityInput=document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity=Number(quantityInput.value);
      if ((newQuantity<=0 || newQuantity>=1000)||(isNaN(newQuantity))){
        document.querySelector(`.js-alert-msg-${productId}`)
          .innerHTML="Please enter a quantity between 1 and 1000.";
        return;
      }
      else{
        document.querySelector(`.js-alert-msg-${productId}`)
          .innerHTML='';
        updateQuantity(productId,newQuantity);
        checkoutHeader();
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;
      }
    });
  });








  

