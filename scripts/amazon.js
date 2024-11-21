
// 2.generate html for webpage and store above data in html
import { cart,addToCart } from "../data/cart(1).js"; 
import { products } from "../data/products(1).js"; 

let productsHTML ='';
products.forEach ((value)=>{
  const html=`
       <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${value.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${value.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
              ${value.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(value.priceCents /100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${value.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id="${value.id}">
            Add to Cart
          </button>
        </div>
  `;
  // console.log(html);
  productsHTML+=html;
});
// console.log(productsHTML);
//to show products on page
document.querySelector('.js-products-grid')
  .innerHTML=productsHTML;

document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) =>{
    button.addEventListener('click',()=>{
      const {productId}=button.dataset;  

      const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`) 
      const quant=Number(quantitySelector.value)
      console.log(quant)

    
      addToCart(productId,quant);
      // update cartQuantiy on webpage 
      let cartQuantity=0;
      cart.forEach((item)=>{
        cartQuantity +=item.quantity;
      })
      console.log(cartQuantity);

      document.querySelector('.js-cart-quantity')
        .innerHTML=cartQuantity;

     
    });
  })