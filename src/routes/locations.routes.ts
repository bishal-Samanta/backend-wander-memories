import { Router } from "express";
import {
  createLocation,
  deleteLocation,
  updateLocation,
} from "../controllers/locations/locations.controllers";
import { getLocation, getLocations } from "../controllers/locations/getLocations.controllers";


const geolocationRoutes = Router();



geolocationRoutes.get("/", getLocations);

geolocationRoutes.post("/", createLocation);

geolocationRoutes.get("/:id", getLocation );

geolocationRoutes.patch("/:id", updateLocation);

geolocationRoutes.delete("/:id", deleteLocation);



export default geolocationRoutes;
