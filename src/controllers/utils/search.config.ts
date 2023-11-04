export const searchPrismaConfig = (search : string | undefined , columnsArray : string[] ) =>{
    
    if(!search){
        return {};
    }
    
    let searchOptions : any = {
        OR : []
    };

    
    if(typeof search === "string"){
        const multiSearch = search.split(" ");

        let track : number = 0;

        for(const i in multiSearch){
            
            for(const j in columnsArray){
                console.log(columnsArray[j])
                searchOptions.OR[track] = {
                    [columnsArray[j]] : {
                        contains : multiSearch[i]
                    }
                }
                track++
            }

        }
        

        return searchOptions;
    }
}

