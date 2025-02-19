import { cart, removeFromCart, CalculateCartQuantity ,updateQuantity, updateDeliveryOption } from "../../data/cart(1).js";
import { products, getProduct } from "../../data/products(1).js"; 
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption(1).js";
import  formatCurrency  from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

// console.log(dayjs());
 
export function renderOrderSummary(){
  let checkoutHTML="";
  cart.forEach((cartItem)=>{
    const matchingProduct=getProduct(cartItem);
    // const products_jsID=products.id;
  
    const matchingDelivery=getDeliveryOption(cartItem);
    const today=dayjs();
    const deliveryDate=today.add(matchingDelivery.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D'); 
    
    checkoutHTML+=`
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
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
                  ${deliveryOptionsHTML(matchingProduct,cartItem)}
                
                </div>
              </div>
        </div>
    
    `
  });

  document.querySelector('.js-order-summary')
    .innerHTML=checkoutHTML;

  //Generating the deliveryoptions with live delivery time
  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html='';
    deliveryOptions.forEach((deliveryItem)=>{
      const today=dayjs();
      const deliveryDate=today.add(deliveryItem.deliveryDays,'days');
      const dateString=deliveryDate.format('dddd, MMMM D'); 
      const priceString=deliveryItem.priceCents===0 
      ?'FREE'
      : `$${formatCurrency(deliveryItem.priceCents)} -`;
      const ischecked= deliveryItem.id===cartItem.deliveryOptionsId
      
      html +=`  
        <div class="delivery-option js-deliver-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryItem.id}">
          <input type="radio"
            ${ischecked  ? 'checked' : ''}
            class="delivery-option-input"  
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }

  //shifted to checkoutHeader.js 
  //Header in checkout page that shows total no .of items in checkout page  
  // function checkoutHeader(){
  //   const cartQuantity= CalculateCartQuantity();
  //   document.querySelector('.js-return-to-home-link')
  //     .innerHTML=`${cartQuantity} items`;
  // }
  // checkoutHeader();
  renderCheckoutHeader();

  //Delete link
  document.querySelectorAll('.js-delete')
    .forEach((deleteLink)=>{
      deleteLink.addEventListener('click',()=>{
        const productId=deleteLink.dataset.productId;
        //In MVC this step removecart() will update model(data)
        removeFromCart(productId); 
        // const container=document.querySelector(`.js-cart-item-container-${productId}`);
        // container.remove();
        // checkoutHeader();
        renderCheckoutHeader();

        //In MVC this step regenerate all HTML using renderorder, renderpayment
        renderOrderSummary();
        renderPaymentSummary();
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
          //In MVC this step will update model(data)
          updateQuantity(productId,newQuantity);
          // checkoutHeader();
          renderCheckoutHeader();
          const container=document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.remove('is-editing-quantity');
          // document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;
          //In MVC this step regenerate all HTML using renderpayment and renderorder
          renderOrderSummary();
          renderPaymentSummary();
        }
      });
  });


  document.querySelectorAll('.js-deliver-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>{
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;
        //In MVC this step will update model(data)
        updateDeliveryOption(productId, deliveryOptionId);
        //In MVC this step regenerate all HTML using renderpayment and renderorder
        renderOrderSummary();
        renderPaymentSummary();
      });
    }) ;   

}

// renderOrderSummary();
  

