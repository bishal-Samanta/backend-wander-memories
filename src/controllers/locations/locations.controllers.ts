import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpResponse } from "../../domain/response";
import { Code } from "../../enums/code.enum";
import { Status } from "../../enums/status.enum";

const prisma = new PrismaClient();



export const createLocation = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    //Check if data with same id exist in the table
    if (req.body.id) {
      const location = await prisma.location.findUnique({
        where: {
          id: Number(req.body.id),
        },
      });

      if (location) {
        return res
          .status(Code.ALREADY_EXIST)
          .send(
            new HttpResponse(
              Code.ALREADY_EXIST,
              Status.ALREADY_EXIST,
              `Data with id ${req.body.id} already exist in location table!`,
              { ...location }
            )
          );
      }
    }

    //Create dairy
    const location = await prisma.location.create({
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
          `Data created for location with ID : ${location.id}`,
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

export const updateLocation = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    //Id data not exist
    if (!location) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Data with id : ${req.params.id} not exist in location table!`
          )
        );
    }

    //Update
    const updatedLocation = await prisma.location.update({
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
          { ...updatedLocation }
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

export const deleteLocation = async (
  req: Request,
  res: Response
): Promise<Response<HttpResponse>> => {
  try {
    const geolocation = await prisma.location.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    //Id data not exist
    if (!geolocation) {
      return res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            `Data with id : ${req.params.id} not exist in Geolocation table!`
          )
        );
    }

    const deletedGeolocation = await prisma.location.delete({
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
