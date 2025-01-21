
import calculateDistance from "./calculateDeliveryDistance"
import calculateDeliveryFee from "./calculateDeliveryFee"
import calculateTotalPrice from "./calculateTotalPrice"
import calculateSmallOrderSurcharge from "./calculateSmallOrderSurcharge"

// export default function calculateOrderDetails(addCartValueToDynamicData) {
//     console.log(addCartValueToDynamicData)
//     const customerVenueLat = 60.182114
//     const customerVenueLon = 24.928135 
//     const userLat= Number(Number(addCartValueToDynamicData.staticData.venue_raw.location.coordinates[1]))
//     const userLon = Number(Number(addCartValueToDynamicData.staticData.venue_raw.location.coordinates[0]))
//     const deliveryDistance = calculateDistance(  userLat, userLon, customerVenueLat, customerVenueLon,);
//     const cartValue = Number(addCartValueToDynamicData.cartValue)
//   console.log(cartValue)
//     const { base_price, distance_ranges } = addCartValueToDynamicData.dynamicData.venue_raw.delivery_specs.delivery_pricing;
//     const orderMinimum = addCartValueToDynamicData.dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge;
  
//     // Calculate small order surcharge
//     const smallOrderSurcharge =
//     cartValue > 0 ? calculateSmallOrderSurcharge(cartValue, orderMinimum) : 0;
//   console.log(smallOrderSurcharge)
//   console.log(orderMinimum, cartValue)
//   console.log(deliveryDistance)
//   console.log(customerVenueLat, customerVenueLon, userLat, userLon)
//     // Calculate delivery fee
//     const deliveryFee = calculateDeliveryFee(deliveryDistance, base_price, distance_ranges);
  
//     // Total price
//     const totalPrice =  calculateTotalPrice(cartValue, deliveryFee, smallOrderSurcharge) ;
  
//     return {
//     deliveryDistance,
//       smallOrderSurcharge,
//       deliveryFee,
//       totalPrice,
//     };
//   }
  


interface DeliveryPricing {
  base_price: number;
  distance_ranges: {
    min: number;
    max: number;
    a: number;
    b: number;
  }[];
}

interface VenueSpecs {
  delivery_pricing: DeliveryPricing;
  order_minimum_no_surcharge: number;
}

interface StaticData {
  venue_raw: {
    location: {
      coordinates: [number, number];
    };
  };
}

interface DynamicData {
  venue_raw: {
    delivery_specs: VenueSpecs;
  };
}

interface AddCartValueToDynamicData {
  staticData: StaticData;
  dynamicData: DynamicData;
  cartValue: string | number;
}

export default function calculateOrderDetails(
  addCartValueToDynamicData: AddCartValueToDynamicData
): {
  deliveryDistance: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  totalPrice: number;
} {
  console.log(addCartValueToDynamicData);

  const customerVenueLat = 60.182114;
  const customerVenueLon = 24.928135;
  const userLat = Number(addCartValueToDynamicData.staticData.venue_raw.location.coordinates[1]);
  const userLon = Number(addCartValueToDynamicData.staticData.venue_raw.location.coordinates[0]);
  const deliveryDistance = calculateDistance(userLat, userLon, customerVenueLat, customerVenueLon);
  const cartValue = Number(addCartValueToDynamicData.cartValue);

  console.log(cartValue);

  const { base_price, distance_ranges } =
    addCartValueToDynamicData.dynamicData.venue_raw.delivery_specs.delivery_pricing;
  const orderMinimum =
    addCartValueToDynamicData.dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge;

  // Calculate small order surcharge
  const smallOrderSurcharge =
    cartValue > 0 ? calculateSmallOrderSurcharge(cartValue, orderMinimum) : 0;

  console.log(smallOrderSurcharge);
  console.log(orderMinimum, cartValue);
  console.log(deliveryDistance);
  console.log(customerVenueLat, customerVenueLon, userLat, userLon);

  // Calculate delivery fee
  const deliveryFee = calculateDeliveryFee(deliveryDistance, base_price, distance_ranges);

  // Total price
  const totalPrice = calculateTotalPrice(cartValue, deliveryFee, smallOrderSurcharge);

  return {
    deliveryDistance,
    smallOrderSurcharge,
    deliveryFee,
    totalPrice,
  };
}
