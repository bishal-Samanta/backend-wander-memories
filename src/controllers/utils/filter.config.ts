

export const filterPrismaConfig = ( filterObject : any ) =>{
    let filterOptions : any = {

    };

    //If there is nothing 
    if( Object.values(filterObject).length === 0  ){
        return filterOptions;
    }

    //if there is a thing 
    for(let key in filterObject){
        if(filterObject[key]){
            filterOptions[key] = Number(filterObject[key])
        }
    }

    return filterOptions; 
}