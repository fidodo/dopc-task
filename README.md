Delivery Order Price Calculator
A React and TypeScript app built for calculating delivery fees and surcharges based on user input.
The app allows users to input necessary details such as venue slug, cart value, and location coordinates, and then computes and displays the calculated fees and total price.
Features
Input Validation: Ensures all inputs are valid and provides user feedback for invalid entries.
Geolocation Integration: Allows users to auto-fill latitude and longitude fields using wolt clients location from store/resturant/alko.
Dynamic Calculations: Computes delivery fees, small order surcharges, and the total price dynamically based on input values.
Accessibility: Implements accessible design principles for improved usability.
Test-Friendly Design: Utilizes data-test-id attributes for easy identification of elements during automated testing.
Locale Formatting: Outputs formatted values for cart value, delivery fee, and distance, with raw values stored for easier programmatic access.
Input Fields
The following user inputs are supported:

Venue Slug

Type: text
Data Test ID: venueSlug
Description: The venue for which the delivery pricing is calculated.
Example: home-assignment-venue-helsinki
Cart Value

Type: text or number
Data Test ID: cartValue
Description: The value of the shopping cart in Euros.
Example: 10, 10.55, 100.55
User Latitude

Type: text or number
Data Test ID: userLatitude
Description: Latitude of the user's location.
Example: 60.17094
User Longitude

Type: text or number
Data Test ID: userLongitude
Description: Longitude of the user's location.
Example: 24.93087
Get Location Button

Type: button
Data Test ID: getLocation
Description: Fills latitude and longitude fields with the user's current location.
Outputs
The application calculates and displays the following results:

Cart Value: Formatted in Euros.
Small Order Surcharge: Calculated surcharge for small orders, formatted in Euros.
Delivery Fee: Formatted in Euros.
Delivery Distance: Distance calculated in meters.
Total Price: The total cost, formatted in Euros.
Raw Values
Each formatted value is wrapped in an HTML element containing a data-raw-value attribute:

Money values (cart value, surcharges, delivery fee, total price): Stored in cents.
Delivery distance: Stored in meters.
Example Usage
Input
Venue Slug: home-assignment-venue-helsinki
Cart Value: 100.55
Latitude: 60.17094
Longitude: 24.93087
Output
Cart Value: <span data-raw-value="1055">100.55 EUR</span>
Small Order Surcharge: <span data-raw-value="0">0 EUR</span>
Delivery Fee: <span data-raw-value="190">1.90 EUR</span>
Delivery Distance: <span data-raw-value="177">177 m</span>
Total Price: <span data-raw-value="1190">101.90 EUR</span>
Installation and Setup
unzip file downloaded
navigate to the folder in your terminal To run the application, you'll need to have Node.js installed on your machine. You can download it from the official Node.js website: https://nodejs.org/en/download/ Once you have Node.js installed, you can install the required packages by running the following command in your terminal: bash npm install bash After the installation is complete, you can start the application by running the following command in your terminal: bash npm run dev bash
This will start the development server, and you can access the application in your web browser at http://localhost:3000.

Manual testing the application
On the Ui, you can input the values in the input fields,

use "home-assignment-venue-helsinki" in the venue slug.
Add cartvalue, it could be any number but not 0.
Click the Get location button, The application will calculate and display the results. The GetLocation button has a function that is used to get the location of the user. The application also uses the Google Maps API to calculate the distance between the user's location and the venue.
click on the button calculate
If the delivery is not possible, for example if the delivery distance is too long, the UI should shows error, with explanatory information
how to test using jest
open another terminal and run the following command bash npm run jest / npm jest
