import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpResponse } from "../../domain/response";
import { Code } from "../../enums/code.enum";
import { Status } from "../../enums/status.enum";
import { sortingPrismaConfig } from "../utils/sort.config";
import { paginationPrismaConfig } from "../utils/pagination.config";
import { requiredPrismaConfig } from "../utils/required.config";

const prisma = new PrismaClient();

export const getLocations = async (
    req: Request,
    res: Response
  ): Promise<Response<HttpResponse>> => {

    const query : any = req.query;
    const { sort , order , limit , page , required } =  query ;
    
    //Sorting 
    const sortOptions  = sortingPrismaConfig(sort , order);
    const paginationOptions = paginationPrismaConfig(limit , page)
    const requiredOptions = requiredPrismaConfig(required);

    try {
      const locations = await prisma.location.findMany({
        ...sortOptions,
        ...paginationOptions,
        ...requiredOptions,
      });
  
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            `Data Retrived for : locations`,
            locations
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
    const location = await prisma.location.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!location) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Location not exist with the id : ${req.params.id}`
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
          { ...location }
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
  