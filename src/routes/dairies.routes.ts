import { Router  } from "express";
import { createDairy, deleteDairy,  getDairies, getDairy, updateDairy } from "../controllers/dairies.controllers";

const dairiesRoutes = Router();


//Get all the dairies
dairiesRoutes.get("/" , getDairies);


//Create Dairies 
dairiesRoutes.post("/", createDairy);


//Get One Dairies 
dairiesRoutes.get("/:id" , getDairy);


//Update One Dairies 
dairiesRoutes.patch("/:id" , updateDairy);


//Delete One Dairies 
dairiesRoutes.delete("/:id" , deleteDairy );



//Get All the images in a Dairy 
// dairiesRoutes.get("/:id/images" , getAllImagesInADairy)

/*
//Upload Image inside an Dairy 
dairiesRoutes.post("/:id/images")
*/


export default dairiesRoutes;