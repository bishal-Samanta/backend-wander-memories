export const paginationPrismaConfig = (limit : undefined | number | string , page : undefined | number) =>{

    let paginationOptions : {take? : number ; skip? : number } ={
        take : 10,
        skip : 0
    }

    if(limit && !page){
        paginationOptions.take = Number(limit);
        if(limit === "all"){
            delete paginationOptions.take;
        }
    }

    if(page && !limit) {
        paginationOptions.skip = ( Number(page) - 1 ) * 10;
    }

    if(limit && page){
        paginationOptions.skip = ( Number(page) - 1 ) * Number(limit);
        paginationOptions.take = Number(limit);
    }

    return paginationOptions; 
}