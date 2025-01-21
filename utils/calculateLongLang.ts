export const calculateLongLang =({
    venue,
   staticData:{
    venue_raw: {
        name,
        location: { coordinates },
      },
   }
}: {
   
    venue: string;
    staticData: {
        venue_raw: {
            name: string;
            location: {
                coordinates: [number, number];
            };
        };
    };
}) => {
console.log( name, venue)
console.log(coordinates[1], coordinates[0])
function normalizeString(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
  }
if(normalizeString(name) === normalizeString(venue)) 
return {
    userLatitude: coordinates[1],
    userLongitude: coordinates[0],
}
}