import express, { Application , Request , Response } from "express";
import ip from "ip";
import { Code } from "./enums/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enums/status.enum";
import cors from "cors";
import morgan from "morgan";
import dairiesRoutes from "./routes/trips.routes";
import imagesRoutes from "./routes/images.routes";
import geolocationRoutes from "./routes/locations.routes";


const app: Application = express();
const port: string | number = process.env.SERVER_PORT || 5000;

//Middlewares 
app.use(cors({origin : "*"}));
app.use(express.json());
app.use(morgan("dev"))
require('dotenv').config();

//Swagger


//APIS
app.use("/api/trips" , dairiesRoutes )
app.use("/api/images" , imagesRoutes )
app.use("/api/locations" , geolocationRoutes )


//API main Route
app.get("/api", (req: Request, res: Response) => {
    res
      .status(Code.OK)
      .send(
        new HttpResponse(Code.OK, Status.OK, "Welcome to WonderTravell API v.1.0")
      );
});


//Main Route 
app.get("/", (req: Request, res: Response) => {
    res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          "Please hit /api route to visit the home page."
        )
    );
});





//404
app.all("*", (req: Request, res: Response) => {
    res
      .status(Code.NOT_FOUND)
      .send(
        new HttpResponse(
          Code.NOT_FOUND,
          Status.NOT_FOUND,
          `Oops! No route exists like : ${req.params[0]}`
        )
      );
  });


//Listening app
app.listen(port , () =>{
    try{
        console.info(`Application is listening on: ${ip.address()}:${port}`);
    }
    catch(err){
        console.log(`Some error while listening app on port : ${port}`);
    }
})
