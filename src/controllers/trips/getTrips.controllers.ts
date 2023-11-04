import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpResponse } from "../../domain/response";
import { Code } from "../../enums/code.enum";
import { Status } from "../../enums/status.enum";

const prisma = new PrismaClient();


export const getTrips = async (
    req: Request,
    res: Response
    ): Promise<Response<HttpResponse>> => {
    try {
        const dairies = await prisma.dairy.findMany();

        return res
        .status(Code.OK)
        .send(
            new HttpResponse(
            Code.OK,
            Status.OK,
            `Data Retrived for : Dairies`,
            dairies
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
    const dairy = await prisma.dairy.findUnique({
    where: {
        id: Number(req.params.id),
    },
    include: {
        images: {
        include: {
            geolocations: true,
        },
        },
    },
    });

    if (!dairy) {
    return res
        .status(Code.NOT_FOUND)
        .send(
        new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Dairy not exist with the id : ${req.params.id}`
        )
        );
    }

    return res
    .status(Code.OK)
    .send(
        new HttpResponse(Code.OK, Status.OK, `Data Retrived for : Dairies`, {
        ...dairy,
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