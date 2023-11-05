

export const filterPrismaConfig = ( filterObject : any ) =>{
    console.log(filterObject)
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

    console.log(filterOptions)

    return filterOptions; 
}