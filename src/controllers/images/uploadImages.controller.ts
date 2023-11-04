import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { HttpResponse } from "../../domain/response";
import { Code } from "../../enums/code.enum";
import { Status } from "../../enums/status.enum";
import generateUniqueFileName from "../../utils/generateUniqueFileName";
import { putObjectURL } from "../../services/uploadFileInS3";



const prisma = new PrismaClient();



export const uploadImageInS3 = async (req: Request, res: Response) => {
    const { fileName, contentType } = req.body;
    try {
      const key = generateUniqueFileName(fileName);
  
      const url = await putObjectURL(`${key}`, `${contentType}`);
  
      res
        .status(Code.OK)
        .send(
          new HttpResponse(Code.OK, Status.OK, "Response in from s3", {
            url: url,
            key: key,
            contentType: contentType,
          })
        );
    } catch (err) {
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
  
