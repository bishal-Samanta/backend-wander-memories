import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpResponse } from "../../domain/response";
import { Code } from "../../enums/code.enum";
import { Status } from "../../enums/status.enum";


const prisma = new PrismaClient();



export const createTrip = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    //Check if data with same id exist in the table
    if (req.body.id) {
      const trip = await prisma.trip.findUnique({
        where: {
          id: Number(req.body.id),
        },
      });

      if (trip) {
        return res
          .status(Code.ALREADY_EXIST)
          .send(
            new HttpResponse(
              Code.ALREADY_EXIST,
              Status.ALREADY_EXIST,
              `Data with id ${req.body.id} already exist in Trip table!`,
              { ...trip }
            )
          );
      }
    }

    //Create dairy
    const trip = await prisma.trip.create({
      data: {
        ...req.body,
      },
    });

    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          `Data created for Trip with ID : ${trip.id}`,
          { ...trip }
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

export const updateTrip = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const trip = await prisma.trip.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    //Id data not exist
    if (!trip) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Data with id : ${req.params.id} not exist in Trip table!`
          )
        );
    }

    //Update
    const updatedTrip = await prisma.trip.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          `Data with id : ${req.params.id} updated!`,
          updatedTrip
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

export const deleteTrip = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const trip = await prisma.trip.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    //Id data not exist
    if (!trip) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Data with id : ${req.params.id} not exist in Trip table!`
          )
        );
    }

    const deletedTrip = await prisma.trip.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res
      .status(Code.OK)
      .send(
        new HttpResponse(
          Code.OK,
          Status.OK,
          `Data with id : ${req.params.id} Deleted from the database!`
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

