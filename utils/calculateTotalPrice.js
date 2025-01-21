export default function calculateTotalPrice(cartValue, deliveryFee, smallOrderSurcharge) {
  console.log(cartValue, deliveryFee, smallOrderSurcharge);
    return cartValue + deliveryFee + smallOrderSurcharge;
  }
  