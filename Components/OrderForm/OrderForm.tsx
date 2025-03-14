import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";


interface OrderFormProps {
  onSubmit: (data: {
    venueSlug: string;
    cartValue: string;
    userLatitude: string;
    userLongitude: string;
  }) => void;
  staticData:{
    venue_raw:{
        name:string
        location: {
            coordinates: [number, number];
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

}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, setSummary}) => {
  




  const [form, setForm] = useState({
    venueSlug: "",
    cartValue: "",
    userLatitude: "",
    userLongitude: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});



// Function to handle the onClick in get location
const handleClick = () => {

      if (!navigator.geolocation) {
        setErrors({error:"Geolocation is not supported by your browser."});
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
       
          setForm((prevForm) => ({
            ...prevForm,
            userLatitude: String(latitude.toFixed(6)),
            userLongitude: String(longitude.toFixed(6)),
          }));
          setErrors({});
          setSummary({
            cartValue: 0,
            smallOrderSurcharge: 0,
            deliveryFee: 0,
            deliveryDistance: 0,
            totalPrice: 0,
            range:0
          });
        },
        (err) => {
          console.log(err);
          setErrors({error:"Unable to retrieve location. Please check permissions."});
      
        }
      );
  };


 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
  
    // Venue Slug Validation
    if (!form.venueSlug) {
      newErrors.venueSlug = "Venue slug is required.";
    }
  
    // Cart Value Validation
    const cartValue = parseFloat(form.cartValue);
    if (!form.cartValue || isNaN(cartValue) || cartValue < 0) {
      newErrors.cartValue = "Cart value must be a positive number.";
    }
  
    // Latitude Validation
    const latitude = parseFloat(form.userLatitude);
    if (
      !form.userLatitude || 
      isNaN(latitude) || 
      latitude < -90 || 
      latitude > 90
    ) {
      newErrors.userLatitude = "Valid latitude is required (-90 to 90).";
    }
  
    // Longitude Validation
    const longitude = parseFloat(form.userLongitude);
    if (
      !form.userLongitude || 
      isNaN(longitude) || 
      longitude < -180 || 
      longitude > 180
    ) {
      newErrors.userLongitude = "Valid longitude is required (-180 to 180).";
    }
  
    return newErrors;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(form);
    setErrors({});
    setForm({venueSlug: "",
        cartValue: "",
        userLatitude: "",
        userLongitude: "",})
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" >
      <div>
        <label  htmlFor="venueSlug"  className="block font-medium">Venue Slug <FontAwesomeIcon icon={faStore} className="text-blue-500 text-lg"/> </label>
       
        <input
          type="text"
          id="venueSlug"
          placeholder="Enter venue slug"
          name="venueSlug"
          data-test-id="venueSlug"
          value={form.venueSlug}
          onChange={handleChange}
             className="w-full border rounded-md p-2 mt-1"
        />
        {errors.venueSlug && <span className="text-red-500 text-sm">{errors.venueSlug}</span>}
      </div>

      <div>
        <label htmlFor="cartValue" className="block font-medium">Cart Value   <FontAwesomeIcon icon={faEuroSign} className="text-blue-500 text-lg"/></label>
        <input
          type="text"
          id="cartValue"
            placeholder="Enter cart value"
          name="cartValue"
          data-test-id="cartValue"
          value={form.cartValue}
          onChange={handleChange}
           className="w-full border rounded-md p-2 mt-1"
        />
        {errors.cartValue && <span className="text-red-500 text-sm">{errors.cartValue}</span>}
      </div>

      <button type="button" data-test-id="getLocation" className="w-full bg-green-700 text-white rounded-md p-2 hover:bg-green-800"
      onClick={handleClick}
        >
        Get Location
      </button>

      <div>
        <label htmlFor="userLatitude" className="block font-medium">User Latitude  <FontAwesomeIcon icon={faMapPin} className="text-blue-500 text-lg" /></label>
        <input
          type="text"
          id="userLatitude"
            placeholder="Get location latitude"
          name="userLatitude"
          data-test-id="userLatitude"
          value={form.userLatitude}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        />
        {errors.userLatitude && <span className="text-red-500 text-sm">{errors.userLatitude}</span>}
      </div>

      <div>
        <label htmlFor="userLongitude" className="block font-medium">User Longitude <FontAwesomeIcon icon={faMapPin} className="text-blue-500 text-lg" /></label>
        <input
          type="text"
          id="userLongitude"
          placeholder="Get location longitude"
          name="userLongitude"
          data-test-id="userLongitude"
          value={form.userLongitude}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        />
        {errors.userLongitude && <span className="text-red-500 text-sm">{errors.userLongitude}</span>}
      </div>

  

      <button type="submit" data-test-id="calculate" className="w-full bg-blue-700 text-white rounded-md p-2 hover:bg-blue-800"
        >
      Calculate Price
      </button>
    </form>
  );
};

export default OrderForm;
