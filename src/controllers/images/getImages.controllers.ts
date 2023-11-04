import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpResponse } from "../../domain/response";
import { Code } from "../../enums/code.enum";
import { Status } from "../../enums/status.enum";
import { sortingPrismaConfig } from "../utils/sort.config";

const prisma = new PrismaClient();

export const getImages = async (
    req: Request,
    res: Response
  ): Promise<Response<HttpResponse>> => {


    const query : any = req.query;
    const { sort , order } =  query ;
    
    //Sorting 
    let sortOptions;
    if( sort ){
        sortOptions  = sortingPrismaConfig(sort , order);
    }

    try {
      const images = await prisma.image.findMany({
        ...sortOptions,
        include: {
          location: true,
        },
      });
  
      return res
        .status(Code.OK)
        .send(
          new HttpResponse(
            Code.OK,
            Status.OK,
            `Data Retrived for : Images`,
            images
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
  
export const getImage = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const image = await prisma.image.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!image) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Image not exist with the id : ${req.params.id}`
          )
        );
    }

    return res
      .status(Code.OK)
      .send(
        new HttpResponse(Code.OK, Status.OK, `Data Retrived for : Image`, {
          ...image,
        })
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
  
