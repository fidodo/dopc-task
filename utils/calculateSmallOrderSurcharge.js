export default function calculateSmallOrderSurcharge(cartValue, orderMinimum) {
  const difference = orderMinimum - cartValue;
  return difference > 0 ? difference : 0;
}