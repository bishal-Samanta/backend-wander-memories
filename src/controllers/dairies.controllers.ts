import { PrismaClient } from "@prisma/client"
import { Request , Response } from "express";
import { HttpResponse } from "../domain/response";
import { Code } from "../enums/code.enum";
import { Status } from "../enums/status.enum";



const prisma = new PrismaClient();


export const getDairies = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{
        const dairies = await prisma.dairy.findMany();
        
        return res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK , `Data Retrived for : Dairies` , dairies )
        )
    }
    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}


export const getDairy = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{
        const dairy = await prisma.dairy.findUnique({
            where: {
                id : Number(req.params.id)
            },
            include : {
                images : {
                    include: {
                        geolocations : true
                    }
                }
            }
        });

        if(!dairy){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND , `Dairy not exist with the id : ${req.params.id}`  )
            )

        }
       
        return res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK , `Data Retrived for : Dairies` , {...dairy} )
        )
    }
    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}


export const createDairy = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{
        
        //Check if data with same id exist in the table 
        if(req.body.id){
            const dairy = await prisma.dairy.findUnique({
                where: {
                    id : Number(req.body.id)
                }
            });

            if(dairy){
                return res.status(Code.ALREADY_EXIST ).send(
                    new HttpResponse(Code.ALREADY_EXIST , Status.ALREADY_EXIST , `Data with id ${req.body.id} already exist in dairy table!` , {...dairy})
                )
            }
        }
        
        
        //Create dairy 
        const dairy = await prisma.dairy.create({
            data : {
                ...req.body
            }
        })

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK, Status.OK , `Data created for Dairies with ID : ${dairy.id}` , {...dairy} )
        )

    }

    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}








export const updateDairy = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{
        const dairy = await prisma.dairy.findUnique({
            where: {
                id : Number(req.params.id)
            }
        });

        //Id data not exist 
        if(!dairy){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `Data with id : ${req.params.id} not exist in Dairy table!`)
            );
        }

        //Update 
        const updatedDairy = await prisma.dairy.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body
            }
        })

        return res.status(Code.OK).send(
            new HttpResponse(Code.OK , Status.OK , `Data with id : ${req.params.id} updated!`, updatedDairy)
        )

    }
    catch(err : unknown){
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR).send(
            new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
        );
    }
}



export const deleteDairy = async ( req: Request , res : Response ) : Promise<Response<HttpResponse>> =>{
    try{

        const dairy = await prisma.dairy.findUnique({
            where: {
                id : Number(req.params.id)
            }
        });

        //Id data not exist 
        if(!dairy){
            return res.status(Code.NOT_FOUND).send(
                new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `Data with id : ${req.params.id} not exist in Dairy table!`)
            );
        }

        const deletedDairy = await prisma.dairy.delete({
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



//Get All the images in a Dairy 
// dairiesRoutes.get("/:id/images")

// export const getAllImagesInADairy = async ( req :Request , res :Response ) : Promise<Response<HttpResponse>> =>{
//     const {id} = req.params;
//     console.log(id)
//     try{
//         const dairy = await prisma.dairy.findUnique({
//             where : {
//                 id : Number(id) 
//             }
//         })

//         if(!dairy){
//             return res.status(Code.NOT_FOUND).send(
//                 new HttpResponse(Code.NOT_FOUND , Status.NOT_FOUND , `Data with id : ${id} not exist in Dairy table!`)
//             );

//         };

//         const imagesInaDairy = await prisma.dairy.findUnique({
//             where: {
//                 id : Number(id)
//             },
//             include : {
//                 images : true
//             }
//         })

//         return res.status(Code.OK).send(
//             new HttpResponse(Code.OK , Status.OK , `Data with id : ${req.params.id} retrived from the database!` , {...imagesInaDairy })
//         );




//     }
//     catch(err : unknown ){
//         console.log(err);
//         return res.status(Code.INTERNAL_SERVER_ERROR).send(
//             new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR , "Internal error from catch block!" , {err})
//         );

//     }
// }