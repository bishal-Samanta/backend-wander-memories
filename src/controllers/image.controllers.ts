import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
import { HttpResponse } from "../domain/response";
import { Code } from "../enums/code.enum";
import { Status } from "../enums/status.enum";
import { getObjectURL, putObjectURL } from "../services/uploadFileInS3";
import generateUniqueFileName from "../utils/generateUniqueFileName";



const prisma = new PrismaClient();


export const getImages = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{
        const images = await prisma.image.findMany({
            include : {
                geolocations: true
            }
        });
        
        return res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK , `Data Retrived for : Images` , images )
        )
    }
    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}


export const getImage = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{
        const image = await prisma.image.findUnique({
            where: {
                id : Number(req.params.id)
            }
        });

        if(!image){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND , `Image not exist with the id : ${req.params.id}`  )
            )

        }
       
        return res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK , `Data Retrived for : Image` , {...image} )
        )
    }
    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}


export const createImage = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{
        
        //Check if data with same id exist in the table 
        if(req.body.id){
            const image = await prisma.image.findUnique({
                where: {
                    id : Number(req.body.id)
                }
            });

            if(image){
                return res.status(Code.ALREADY_EXIST ).send(
                    new HttpResponse(Code.ALREADY_EXIST , Status.ALREADY_EXIST , `Data with id ${req.body.id} already exist in image table!` , {...image})
                )
            }
        }
        
        
        //Create dairy 
        const image = await prisma.image.create({
            data : {
                ...req.body
            }
        })

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK , `Data created for Image with ID : ${image.id}` , {...image} )
        )

    }

    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}








export const updateImage = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{
        const image = await prisma.image.findUnique({
            where: {
                id : Number(req.params.id)
            }
        });

        //Id data not exist 
        if(!image){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `Data with id : ${req.params.id} not exist in image table!`)
            );
        }

        //Update 
        const updatedImage = await prisma.image.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body
            }
        })

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , `Data with id : ${req.params.id} updated!` , {...updatedImage})
        )

    }
    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}



export const deleteImage = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{

        const image = await prisma.image.findUnique({
            where: {
                id : Number(req.params.id)
            }
        });

        //Id data not exist 
        if(!image){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `Data with id : ${req.params.id} not exist in Image table!`)
            );
        }

        const deletedImage = await prisma.image.delete({
            where : {
                id : Number(req.params.id)
            }
        });

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , `Data with id : ${req.params.id} Deleted from the database!`)
        );



    }
    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}



export const uploadImageInS3 = async (req: Request , res: Response) =>{

    const {fileName , contentType } = req.body;
    try{
        
        const key = generateUniqueFileName(fileName)
        
        const url = await putObjectURL(`${key}` , `${contentType}` )      
        
        res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , "Response in from s3" , { url : url , key : key , contentType : contentType   })
        )

    }
    catch(err){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}