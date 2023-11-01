import { Router  } from "express";
import { createImage, deleteImage, getImage, getImages, updateImage, uploadImageInS3 } from "../controllers/image.controllers";

const imagesRoutes = Router();


//Get all the Image
imagesRoutes.get("/" , getImages);

//Create Image -> with post request
imagesRoutes.post("/" , createImage);

imagesRoutes.post("/upload" , uploadImageInS3 );

//Get One Image
imagesRoutes.get("/:id" , getImage);

//Update One Image 
imagesRoutes.patch("/:id" , updateImage);


//Delete One Image 
imagesRoutes.delete("/:id" , deleteImage);

export default imagesRoutes;
