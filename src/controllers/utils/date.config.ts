
  
export const filterTripsByMonth = (inputMonth: number, trips: any) => {
    return trips.filter((trip : any) => {
      const startDate = new Date(trip.start_date);
      const endDate = new Date(trip.end_date);
      const startMonth = startDate.getMonth() + 1; // JavaScript months are 0-based, so we add 1.
      const endMonth = endDate.getMonth() + 1;
  
      return inputMonth >= startMonth && inputMonth <= endMonth;
    });
}


export const filterTripsByYear = (inputYear: number, trips: any) => {
    return trips.filter((trip : any) => {
      const startDate = new Date(trip.start_date);
      const endDate = new Date(trip.end_date);
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
  
      return inputYear >= startYear && inputYear <= endYear;
    });
}


export const filterTripsByYearAndMonth = (inputYear: number, inputMonth: number, trips: any ) => {
    
    return trips.filter(( trip : any ) => {
      const startDate = new Date(trip.start_date);
      const endDate = new Date(trip.end_date);
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      const startMonth = startDate.getMonth() + 1; // JavaScript months are 0-based, so we add 1
      const endMonth = endDate.getMonth() + 1;
     
  
    //   return (
    //     (inputYear > startYear || (inputYear === startYear && inputMonth >= startMonth)) &&
    //     (inputYear < endYear || (inputYear === endYear && inputMonth <= endMonth))
    //   );

        return(
            (inputYear === startYear && inputMonth === startMonth ) || ( inputYear === endYear && inputMonth === endMonth )
        )

    });
}