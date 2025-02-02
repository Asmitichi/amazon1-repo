import { cart } from "../../data/cart(1).js";
import { getProduct } from "../../data/products(1).js";
import { deliveryOptions } from "../../data/deliveryOption(1).js";
import { getDeliveryOption } from "../../data/deliveryOption(1).js";
import {formatCurrency} from "../utils/money.js";


export function renderPaymentSummary(){
  //Save data(model)
  let productPriceCents=0;
  let shippingPriceCents=0;
  let totalBeforeTaxCents=0;
  let taxCents=0;
  let totalAfterTaxCents=0;
  cart.forEach((cartItem)=>{
    const product=getProduct(cartItem);
    productPriceCents+=product.priceCents * cartItem.quantity;

    const deliveryOption=getDeliveryOption(cartItem);
    shippingPriceCents+=deliveryOption.priceCents;
  });
  totalBeforeTaxCents=productPriceCents+shippingPriceCents;
  taxCents=((totalBeforeTaxCents)/10);
  totalAfterTaxCents=totalBeforeTaxCents+taxCents;
  console.log(productPriceCents);
  console.log(shippingPriceCents);
  console.log(totalBeforeTaxCents);
  console.log(taxCents);
  console.log(totalAfterTaxCents);

  //Gnerate HTML
  const paymentSummaryHTML=`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$
        ${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      $${formatCurrency(totalAfterTaxCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  
  `;
  document.querySelector('.js-payment-summary')
    .innerHTML= paymentSummaryHTML;
}