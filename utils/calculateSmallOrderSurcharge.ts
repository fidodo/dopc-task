export default function calculateSmallOrderSurcharge(cartValue:number, orderMinimum:number) {
  const difference = orderMinimum - cartValue;
  return difference > 0 ? difference : 0;
}