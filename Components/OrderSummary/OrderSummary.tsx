import React, { useState, useEffect } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faRuler } from "@fortawesome/free-solid-svg-icons";

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
console.log(summary.deliveryDistance)
console.log(summary.range)
    console.log("summary",summary)
  return (
    <div className="space-y-4  text-gray-700">
      {errorMessage && <ErrorMessage message={errorMessage} isVisible={isVisible} setIsVisible={setIsVisible}/>} 
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faCartShopping} className="text-blue-500 text-lg" />
    <strong>Cart Value:</strong>{" "}
    </div>
        <span data-raw-value={summary.cartValue * 100}  className="font-semibold">
          {Number(summary.cartValue.toFixed(2))} EUR
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faEuroSign} className="text-blue-500 text-lg"/>
        <strong>Small Order Surcharge:</strong>{" "}
        </div>
        <span data-raw-value={summary.smallOrderSurcharge * 100}  className="font-semibold">
          {Number(summary.smallOrderSurcharge.toFixed(2)) / 100} EUR
        </span>
      </div>
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faEuroSign} className="text-blue-500 text-lg"/>
        <strong>Delivery Fee:</strong>{" "}
        </div>
        <span data-raw-value={summary.deliveryFee * 100}  className="font-semibold">
          {Number(summary.deliveryFee.toFixed(2)) / 100} EUR
        </span>
      </div>
      <div className="flex items-center  justify-between">
      <div className="flex items-center space-x-2">
      <FontAwesomeIcon icon={faRuler} className="text-blue-500 text-lg" />
        <strong>Delivery Distance:</strong>{" "}
        </div>
        <span data-raw-value={summary.deliveryDistance}  className="font-semibold">{summary.deliveryDistance.toFixed(2) } m</span>
      </div>
      <hr className="border-gray-300" />
      <div className="flex justify-between text-lg font-bold text-blue-600">
      <div className="flex items-center space-x-2">
     
      <FontAwesomeIcon icon={faClipboardList} className="text-blue-500 text-lg" />
        <strong>Total Price:</strong>{" "}
        </div>
        <span data-raw-value={summary.totalPrice *100}>
          {(summary.totalPrice.toFixed(2)) } EUR
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;





{/* <FontAwesomeIcon icon="fa-solid fa-map-pin" />

<FontAwesomeIcon icon="fa-solid fa-euro-sign" />
<FontAwesomeIcon icon="fa-solid fa-truck" />
<FontAwesomeIcon icon="fa-solid fa-store" /> */}
