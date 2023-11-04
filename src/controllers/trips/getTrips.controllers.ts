import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpResponse } from "../../domain/response";
import { Code } from "../../enums/code.enum";
import { Status } from "../../enums/status.enum";
import { sortingPrismaConfig } from "../utils/sort.config";
import { paginationPrismaConfig } from "../utils/pagination.config";
import { requiredPrismaConfig } from "../utils/required.config";

const prisma = new PrismaClient();


export const getTrips = async (
    req: Request,
    res: Response
    ): Promise<Response<HttpResponse>> => {
    
        
    const query : any = req.query;

    const { sort , order , limit , page , required } =  query ;
  
    
    //Prisma Configs 
    const sortOptions  = sortingPrismaConfig(sort , order);
    const paginationOptions = paginationPrismaConfig(limit , page)
    const requiredOptions = requiredPrismaConfig(required);

    
    try {
        const trips = await prisma.trip.findMany({
            ...sortOptions,
            ...paginationOptions ,
            ...requiredOptions
        });

        return res
        .status(Code.OK)
        .send(
            new HttpResponse(
            Code.OK,
            Status.OK,
            `Data Retrived for : Trips`,
            trips
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



export const getTrip = async (
req: Request,
res: Response
): Promise<Response<HttpResponse>> => {
try {
    const trip = await prisma.trip.findUnique({
    where: {
        id: Number(req.params.id),
    },
    include: {
        images: {
        include: {
            location: true,
        },
        },
    },
    });

    if (!trip) {
    return res
        .status(Code.NOT_FOUND)
        .send(
        new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Trip not exist with the id : ${req.params.id}`
        )
        );
    }

    return res
    .status(Code.OK)
    .send(
        new HttpResponse(Code.OK, Status.OK, `Data Retrived for : Trip`, {
        ...trip,
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