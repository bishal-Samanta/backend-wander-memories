export const getAllLocationsForaTrip = (trip : string | undefined) =>{
      
    if(!trip){
      return {}
    }
    
    return {
      images : {
        every : {
          trip_id : Number(trip)
        }
      }
    }
}


export const getAllTripsForALocation = (location : string) =>{
  if(!location){
      return {};
  }

  return {
      images : {
          some : {
              location_id : Number(location)
          }
      }

  }
}