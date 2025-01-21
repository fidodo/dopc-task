export default function calculateDistance( lat1: number | string,
  lon1: number | string,
  lat2: number | string,
  lon2: number | string) {
  console.log("oooo",lat1, lon1, lat2, lon2);
  console.log(typeof lat1, typeof lon1, typeof lat2, typeof lon2);
    const toRadians = (deg: number) => (deg * Math.PI) / 180;

    lat1 = Number(lat1);
lon1 = Number(lon1);
lat2 = Number(lat2);
lon2 = Number(lon2);
 
    const R = 6371000; 
  
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    console.log(`Distance: ${(R * c).toFixed(2)}`);
  
    return R * c; 
  }
  