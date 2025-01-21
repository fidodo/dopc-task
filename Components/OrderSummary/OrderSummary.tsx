import React from "react";

interface DistanceRange {
    min: number; 
    max: number;
    a: number; 
    b: number; 
    flag: null | any; 
  }

interface SummaryProps {
  summary: {
    cartValue: number;
    smallOrderSurcharge: number;
    deliveryFee: number;
    deliveryDistance: number;
    totalPrice: number;
  };
  dynamicData: {
  venue_raw:{
    delivery_specs: {
        delivery_pricing:{
            base_price:number
            distance_ranges:DistanceRange[]
        }    
order_minimum_no_surcharge: number;
      };
}
  }
}

const OrderSummary: React.FC<SummaryProps> = ({ summary, dynamicData }) => {
    console.log(dynamicData)

    console.log("summary",summary)
  return (
    <div className="space-y-4">
      <p>
        <strong>Cart Value:</strong>{" "}
        <span data-raw-value={summary.cartValue * 100}  className="text-gray-700">
          {summary.cartValue.toFixed(2)} EUR
        </span>
      </p>
      <p>
        <strong>Small Order Surcharge:</strong>{" "}
        <span data-raw-value={summary.smallOrderSurcharge * 100}  className="text-gray-700">
          {summary.smallOrderSurcharge.toFixed(2)} EUR
        </span>
      </p>
      <p>
        <strong>Delivery Fee:</strong>{" "}
        <span data-raw-value={summary.deliveryFee * 100}  className="text-gray-700">
          {summary.deliveryFee.toFixed(2)} EUR
        </span>
      </p>
      <p>
        <strong>Delivery Distance:</strong>{" "}
        <span data-raw-value={summary.deliveryDistance}  className="text-gray-700">{summary.deliveryDistance.toFixed(2)} m</span>
      </p>
      <p>
        <strong>Total Price:</strong>{" "}
        <span data-raw-value={summary.totalPrice * 100}>
          {Number(summary.totalPrice).toFixed(2)} EUR
        </span>
      </p>
    </div>
  );
};

export default OrderSummary;
