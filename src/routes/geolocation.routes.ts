import { Router  } from "express";
import { createImage, deleteImage, getImage, getImages, updateImage } from "../controllers/image.controllers";
import { createGeolocation, deleteGeolocation, getGeolocation, getGeolocations, updateGeolocation } from "../controllers/geolocation.controllers";

const geolocationRoutes = Router();


//Get all the Image
geolocationRoutes.get("/" , getGeolocations);

//Create Image -> Upload a image
geolocationRoutes.post("/" , createGeolocation);

//Get One Image
geolocationRoutes.get("/:id" , getGeolocation);

//Update One Image 
geolocationRoutes.patch("/:id" , updateGeolocation);


//Delete One Image 
geolocationRoutes.delete("/:id" , deleteGeolocation);

export default geolocationRoutes;
