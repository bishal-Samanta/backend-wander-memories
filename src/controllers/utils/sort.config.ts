export const sortingPrismaConfig = ( sort : string[] | string | undefined , order :  string | undefined ) =>{

    

    const sortOptions : { orderBy : any } = {
        orderBy : []
    }
    
    if(!sort && !order){
        return sortOptions;
    }

    //Implementing ssorting and order
    console.log(sort)

    //If it is an array I need to iterate 

    //Otherwise I can add the value at index - 0
    if(Array.isArray(sort)){
        //["test2" , "test1"]
        const resultArrayForSort : any = []

        for (const eachSortValue in sort){

            const propertyName: string = eachSortValue as string;
            const orderBy = { [propertyName]: order ? order : "desc" };
            resultArrayForSort.push(orderBy);
        }

        return sortOptions;

    }
    else{
        // Otherwise, set the property using a computed property name
        const propertyName: string = sort as string;
        const orderBy = [{ [propertyName]: order ? order : "desc" }];
        sortOptions.orderBy = orderBy;

        return sortOptions;
    }


}