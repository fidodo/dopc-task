export default function calculateSmallOrderSurcharge(cartValue:number, orderMinimum:number) {
  const difference = orderMinimum - (cartValue * 100);
  return difference > 0 ? difference : 0;
}