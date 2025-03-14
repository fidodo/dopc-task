import React, { useState, useCallback,useEffect } from "react";
import OrderForm from "../Components/OrderForm/OrderForm";
import OrderSummary from "../Components/OrderSummary/OrderSummary";
import { FormDataType } from "../utils/calculateOrderDetails";
import calculateOrderDetails from "../utils/calculateOrderDetails"



const App: React.FC = () => {
  const [staticData, setStaticData] = useState<null | any>(null);
  const [dynamicData, setDynamicData] = useState<null | any>(null);
  const [, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<FormDataType>({
    venueSlug: "",
    cartValue: "",
    userLatitude: "",
    userLongitude: "",
  } as FormDataType);


  const [summary, setSummary] = useState({
    cartValue: 0,
    smallOrderSurcharge: 0,
    deliveryFee: 0,
    deliveryDistance: 0,
    totalPrice: 0,
    range:0
  });


// function called when the form is submitted
  const handleSubmit = (data: typeof formData) => {
    
    setFormData(data);

    const addCartValueToDynamicData = {
      cartValue: (data.cartValue),
      userLatitude: data.userLatitude,
      userLongitude: data.userLongitude,
      dynamicData,
      staticData
  }


    const { smallOrderSurcharge, deliveryFee, deliveryDistance, totalPrice , range} =
    calculateOrderDetails( addCartValueToDynamicData)
    setSummary({
      cartValue: parseFloat(data.cartValue) || 0,
      smallOrderSurcharge,
      deliveryFee,
      deliveryDistance,
      totalPrice,
      range
    });
  };

  // Fetching static data
  const staticVenueUrl = "/api/static/";
  const loadStaticVenueData = useCallback(async () => {
    setIsLoading(true); 
    try {
      const response = await fetch(staticVenueUrl);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json(); 
 

      setStaticData(data.staticVenueInfo); 
    } catch (error) {
  console.log(error)
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
  
      setDynamicData(data); 
    } catch (error) {
console.log(error)
      setErrorMessage(`Error fetching data from ${staticVenueUrl}`);
    } finally {
      setIsLoading(false); 
    }
  }, []);

  useEffect(() => {
    loadStaticVenueData();
     loadDynamicVenueData();
  }, [loadStaticVenueData,loadDynamicVenueData]);

 

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
        {dynamicData && <OrderSummary summary={summary} dynamicData={dynamicData} setSummary={setSummary} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>}
        </div>
      </div>
      <footer className="my-4 w-full">
      <div className="bg-gray-100 py-4 text-center">
        <p className="text-gray-700">© 2025 ayokunle&apos;s Delivery App. All Rights Reserved.</p>
        </div>
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 160"
          className="animate-wave"
          style={{
            animation: "waveAnimation 10s linear infinite",
          }}
        >
          <path
            fill="#4f46e5"
            fillOpacity="1"
             d="M0,48L48,56C96,64,192,80,288,77.35C384,74.5,480,53.5,576,50.65C672,48,768,64,864,69.35C960,74.5,1056,69.5,1152,69.35C1248,69.5,1344,74.5,1392,77.35L1440,80L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"
          ></path>
          
        </svg>
        
      </div>
      
    </footer>

      
    </div>
  );
};

export default App;


