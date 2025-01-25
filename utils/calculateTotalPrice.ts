export default function calculateTotalPrice(
  cartValue: number,
  deliveryFee: number,
  smallOrderSurcharge: number
): number {

  return cartValue + deliveryFee/100 + smallOrderSurcharge/100;
}
  