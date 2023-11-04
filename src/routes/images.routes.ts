import { Router } from "express";
import {
  createImage,
  deleteImage,
  updateImage,
} from "../controllers/images/images.controllers";
import { getImage, getImages } from "../controllers/images/getImages.controllers";
import { uploadImageInS3 } from "../controllers/images/uploadImages.controller";



const imagesRoutes = Router();

imagesRoutes.post("/upload/s3", uploadImageInS3);

imagesRoutes.get("/", getImages);

imagesRoutes.post("/", createImage);

imagesRoutes.get("/:id", getImage);

imagesRoutes.patch("/:id", updateImage);

imagesRoutes.delete("/:id", deleteImage);



export default imagesRoutes;
