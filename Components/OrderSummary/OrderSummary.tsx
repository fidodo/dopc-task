import React, { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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
    range:number
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
    setSummary: React.Dispatch<React.SetStateAction<{
        cartValue: number;
        smallOrderSurcharge: number;
        deliveryFee: number;
        deliveryDistance: number;
        totalPrice: number;
        range:number
    }>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
    errorMessage: string
}

const OrderSummary: React.FC<SummaryProps> = ({ summary, dynamicData, setSummary, errorMessage, setErrorMessage }) => {
   const [isVisible, setIsVisible] = useState(true);
 
 useEffect(() => {
  if (summary.deliveryDistance > summary.range) {
    setSummary({
      cartValue: 0,
      smallOrderSurcharge: 0,
      deliveryFee: 0,
      deliveryDistance: 0,
      totalPrice: 0,
      range: 0,
    });
    setErrorMessage("Delivery not possible: Distance exceeds available ranges.");
    setIsVisible(true);
  }
}, [summary.deliveryDistance, summary.range, setSummary]);
    console.log(dynamicData)

    console.log("summary",summary)
  return (
    <div className="space-y-4">
      {errorMessage && <ErrorMessage message={errorMessage} isVisible={isVisible} setIsVisible={setIsVisible}/>} 
      <p>
        <strong>Cart Value:</strong>{" "}
        <span data-raw-value={summary.cartValue * 100}  className="text-gray-700">
          {Number(summary.cartValue.toFixed(2))} EUR
        </span>
      </p>
      <p>
        <strong>Small Order Surcharge:</strong>{" "}
        <span data-raw-value={summary.smallOrderSurcharge * 100}  className="text-gray-700">
          {Number(summary.smallOrderSurcharge.toFixed(2)) / 100} EUR
        </span>
      </p>
      <p>
        <strong>Delivery Fee:</strong>{" "}
        <span data-raw-value={summary.deliveryFee * 100}  className="text-gray-700">
          {Number(summary.deliveryFee.toFixed(2)) / 100} EUR
        </span>
      </p>
      <p>
        <strong>Delivery Distance:</strong>{" "}
        <span data-raw-value={summary.deliveryDistance}  className="text-gray-700">{summary.deliveryDistance.toFixed(2) } m</span>
      </p>
      <p>
        <strong>Total Price:</strong>{" "}
        <span data-raw-value={summary.totalPrice *100}>
          {(summary.totalPrice.toFixed(2)) } EUR
        </span>
      </p>
    </div>
  );
};

export default OrderSummary;
