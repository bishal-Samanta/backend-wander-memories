import { PutObjectCommand, S3Client , GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import { config } from "dotenv";



const region : any = process.env.REGION;
const accessKye : any = process.env.AWS_ACCESS_KEY_ID;
const secrectKey : any = process.env.AWS_SECRET_ACCESS_KEY;

const client = new S3Client({
    region : region,
    credentials : {
        accessKeyId : accessKye,
        secretAccessKey : secrectKey
    }
})


// const client = new S3Client({
//     region: config.REGION ,
//     credentials : fromEnv({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     })
// });


export const putObjectURL = async (fileName : string , contentType : string ) =>{
    const command = new PutObjectCommand({
        Bucket: "neeldola.dev.wonder.memory",
        Key: `uploads/user-uploads/images/${fileName}`,
        ContentType: contentType
    })

    const url = await getSignedUrl(client , command , { expiresIn : 2 * 60 });

    return url;

}


export const getObjectURL = async (Key : string ) => {

    //Condition to check user validation

    const command = new GetObjectCommand({
        Bucket: "neeldola.dev.wonder.memory",
        Key: Key
    })

    const url = await getSignedUrl(client , command);
    return url;
};