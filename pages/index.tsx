import React, { useState, useCallback,useEffect } from "react";
import OrderForm from "../Components/OrderForm/OrderForm";
import OrderSummary from "../Components/OrderSummary/OrderSummary";

import calculateOrderDetails from "../utils/calculateOrderDetails"



const App: React.FC = () => {
  const [staticData, setStaticData] = useState<null | any>(null);
  const [dynamicData, setDynamicData] = useState<null | any>(null);
  const [, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    venueSlug: "",
    cartValue: "",
    userLatitude: "",
    userLongitude: "",
  });


  const [summary, setSummary] = useState({
    cartValue: 0,
    smallOrderSurcharge: 0,
    deliveryFee: 0,
    deliveryDistance: 0,
    totalPrice: 0,
  });



  const handleSubmit = (data: typeof formData) => {
    
    setFormData(data);
    console.log("formData",formData)
    const addCartValueToDynamicData = {
      cartValue: (data.cartValue),
      userLatitude: data.userLatitude,
      userLongitude: data.userLongitude,
      dynamicData,
      staticData
  }
  console.log(addCartValueToDynamicData.cartValue)

    const { smallOrderSurcharge, deliveryFee, deliveryDistance, totalPrice } =
    calculateOrderDetails( addCartValueToDynamicData)
    setSummary({
      cartValue: parseFloat(data.cartValue) || 0,
      smallOrderSurcharge,
      deliveryFee,
      deliveryDistance,
      totalPrice,
    });
  };

  
  const staticVenueUrl = "/api/static/";
  const loadStaticVenueData = useCallback(async () => {
    setIsLoading(true); 
    try {
      const response = await fetch(staticVenueUrl);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json(); 
      console.log(`Fetched data from ${staticVenueUrl}:`, data);

      setStaticData(data.staticVenueInfo); 
    } catch (error) {
      console.error(`Error fetching data from ${staticVenueUrl}:`, error);
      setErrorMessage(`Error fetching data from ${staticVenueUrl}`);
    } finally {
      setIsLoading(false); 
    }
  }, []);

 
  

  // Fetching dynamic data
  const dynamicVenueUrl = "/api/dynamic/";
  const loadDynamicVenueData = useCallback(async() => {
    setIsLoading(true); 
    try {
      const response = await fetch( dynamicVenueUrl);

      const data = await response.json(); 
      console.log(`Fetched data from ${ dynamicVenueUrl}:`, data);
      setDynamicData(data); 
    } catch (error) {
      console.error(`Error fetching data from ${ dynamicVenueUrl}:`, error);
      setErrorMessage(`Error fetching data from ${staticVenueUrl}`);
    } finally {
      setIsLoading(false); 
    }
  }, []);

  useEffect(() => {
    loadStaticVenueData();
     loadDynamicVenueData();
  }, [loadStaticVenueData,loadDynamicVenueData]);

  console.log(staticData, dynamicData);

  {errorMessage && <div role="alert">{errorMessage}</div>}


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Delivery Order Price Calculator
      </h1>
     
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {staticData && <OrderForm onSubmit={handleSubmit} staticData={staticData} setSummary={setSummary} />}
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {dynamicData && <OrderSummary summary={summary} dynamicData={dynamicData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
