export default function calculateTotalPrice(
  cartValue: number,
  deliveryFee: number,
  smallOrderSurcharge: number
): number {
  console.log(cartValue, deliveryFee, smallOrderSurcharge);
  return cartValue + deliveryFee/100 + smallOrderSurcharge/100;
}
  