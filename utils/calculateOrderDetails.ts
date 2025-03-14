
import calculateDistance from "./calculateDeliveryDistance"
import calculateDeliveryFee from "./calculateDeliveryFee"
import calculateTotalPrice from "./calculateTotalPrice"
import calculateSmallOrderSurcharge from "./calculateSmallOrderSurcharge"


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

export interface StaticData {
  venue_raw: {
    location: {
      coordinates: [number, number];
    };
  };
}

export interface DynamicData {
  venue_raw: {
    delivery_specs: VenueSpecs;
  };
}

export interface FormData {
  venueSlug: string;
    cartValue: string;
    userLatitude: string;
    userLongitude: string
}

export interface FormDataType {
  venueSlug: string;
  cartValue: string;
  userLatitude: string;
  userLongitude: string;
}


interface AddCartValueToDynamicData {
  staticData: StaticData;
  dynamicData: DynamicData;
  cartValue: string | number;
  userLatitude: string | number;
  userLongitude: string | number;
}

export default function calculateOrderDetails(
  addCartValueToDynamicData: AddCartValueToDynamicData
): {
  deliveryDistance: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  totalPrice: number;
  range:number
} {


const myLocationLat = Number(addCartValueToDynamicData.userLatitude);
  const myLocationLon = Number(addCartValueToDynamicData.userLongitude);
  const venueLat = Number(addCartValueToDynamicData.staticData.venue_raw.location.coordinates[1]);
  const venueLon = Number(addCartValueToDynamicData.staticData.venue_raw.location.coordinates[0]);
  const deliveryDistance = calculateDistance(venueLat, venueLon, myLocationLat, myLocationLon);
  const cartValue = Number(addCartValueToDynamicData.cartValue);


  const { base_price, distance_ranges } =
    addCartValueToDynamicData.dynamicData.venue_raw.delivery_specs.delivery_pricing;
  const orderMinimum =
    addCartValueToDynamicData.dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge;

  // Calculate small order surcharge
  const smallOrderSurcharge =
    cartValue > 0 ? calculateSmallOrderSurcharge(cartValue, orderMinimum) : 0;

 

  // Calculate delivery fee
  const deliveryFee = calculateDeliveryFee(deliveryDistance, base_price, distance_ranges);

  // Total price
  const totalPrice = calculateTotalPrice(cartValue, deliveryFee.deliveryFee, smallOrderSurcharge);

  return {
    deliveryDistance,
    smallOrderSurcharge,
    deliveryFee: deliveryFee.deliveryFee,
    totalPrice,
   range: deliveryFee.range
  };
}
