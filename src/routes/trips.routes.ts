import { Router } from "express";
import {
  createTrip,
  deleteTrip,
  updateTrip,
} from "../controllers/trips/trips.controllers";
import { getTrip, getTrips } from "../controllers/trips/getTrips.controllers";



const dairiesRoutes = Router();


dairiesRoutes.get("/", getTrips);

dairiesRoutes.post("/", createTrip);

dairiesRoutes.get("/:id", getTrip);

dairiesRoutes.patch("/:id", updateTrip);

dairiesRoutes.delete("/:id", deleteTrip);



export default dairiesRoutes;
