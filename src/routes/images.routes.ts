import { Router  } from "express";
import { createImage, deleteImage, getImage, getImages, updateImage } from "../controllers/image.controllers";

const imagesRoutes = Router();


//Get all the Image
imagesRoutes.get("/" , getImages);

//Create Image -> Upload a image
imagesRoutes.post("/" , createImage);

//Get One Image
imagesRoutes.get("/:id" , getImage);

//Update One Image 
imagesRoutes.patch("/:id" , updateImage);


//Delete One Image 
imagesRoutes.delete("/:id" , deleteImage);

export default imagesRoutes;
