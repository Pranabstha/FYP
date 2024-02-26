// components/Geocoder.ts

import axios from 'axios';

const GEOCODING_API_URL = 'https://us1.locationiq.com/v1/reverse.php';

interface LocationData {
  filtredAddress: string
  // Add more fields as needed
}

async function reverseGeocode(lat: number, lon: number, apiKey: string): Promise<LocationData | null> {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        key: apiKey,
        lat,
        lon,
        format: 'json'
      }
    });
    
    const location = response.data.display_name;
    // Split the location string by comma and trim each part
    const [street, , , , municipality, province] = location.split(',').map((part: string) => part.trim());
    // Explanation of destructuring:
    // - `street` will be assigned the value of the first part of the split location string (index 0)
    // - `municipality` will be assigned the value of the fifth part (index 4)
    // - `province` will be assigned the value of the sixth part (index 5)
    
    const filtredAddress = ` ${street} ,  ${municipality} , ${province} ` 
    return {
      filtredAddress
    }
    province
  } catch (error) {
    console.log(error)
    return null;
  }
}

export default reverseGeocode;
