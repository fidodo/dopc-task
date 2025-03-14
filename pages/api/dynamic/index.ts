import { NextApiHandler } from "next";


const StaticApi = "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/dynamic"

const handleGetStaticVenueInfo: NextApiHandler = async (req, res) => {
  try {
    const response = await fetch(`${StaticApi}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const dynamicVenueInfo = await response.json();
   
    return res.status(200).json( dynamicVenueInfo);
  } catch (error) {
console.log(error)
    return res
      .status(500)
      .json({ error: "Error fetching DynamicVenueInfo. Internal server error" });
  }
};

const attributesHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return await handleGetStaticVenueInfo(req, res);
    default:
      return res.status(405).send(null);
  }
};

export default attributesHandler as NextApiHandler;
