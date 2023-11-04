export const requiredPrismaConfig = (requiredData : string[] | undefined) =>{
    
    let requiredOptions : any = {
        select : {}
    };

    if(!requiredData){
        return {};
    }

    if(typeof requiredData === "string"){
        requiredOptions.select[requiredData] = true;
        return requiredOptions;
    }


    if(Array.isArray(requiredData)){
        for(const eachRequiredValue in requiredData){

            if(requiredOptions[eachRequiredValue] === undefined){
                requiredOptions.select[requiredData[eachRequiredValue]] = true
            }
        }

        console.log(requiredOptions);

        return requiredOptions;
    }

}