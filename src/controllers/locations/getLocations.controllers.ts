import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpResponse } from "../../domain/response";
import { Code } from "../../enums/code.enum";
import { Status } from "../../enums/status.enum";

const prisma = new PrismaClient();

export const getLocations = async (
    req: Request,
    res: Response
  ): Promise<Response<HttpResponse>> => {
    try {
      const geolocations = await prisma.geolocation.findMany();
  
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            `Data Retrived for : Geolocations`,
            geolocations
          )
        );
    } catch (err: unknown) {
      console.log(err);
      return res
        .status(Code.INTERNAL_SERVER_ERROR)
        .send(
          new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Internal error from catch block!",
            { err }
          )
        );
    }
  };
  
  export const getLocation = async (
    req: Request,
    res: Response
  ): Promise<Response<HttpResponse>> => {
    try {
      const geolocation = await prisma.geolocation.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
  
      if (!geolocation) {
        return res
          .status(Code.NOT_FOUND)
          .send(
            new HttpResponse(
              Code.NOT_FOUND,
              Status.NOT_FOUND,
              `Geolocation not exist with the id : ${req.params.id}`
            )
          );
      }
  
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            `Data Retrived for : geolocation`,
            { ...geolocation }
          )
        );
    } catch (err: unknown) {
      console.log(err);
      return res
        .status(Code.INTERNAL_SERVER_ERROR)
        .send(
          new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Internal error from catch block!",
            { err }
          )
        );
    }
  };
  