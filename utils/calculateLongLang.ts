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

if (coordinates.length < 2) {
    throw new Error('Coordinates array must have at least two elements');
}
function normalizeString(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
  }
if(normalizeString(name) === normalizeString(venue)) 
return {
    userLatitude: coordinates[1],
    userLongitude: coordinates[0],
}
}