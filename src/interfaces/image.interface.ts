import { Trip } from "./trip.interface";
import { Location } from "./location.interfce";


export interface Image {
    id: number;
    name: string;
    description: string;
    image_url: string;
    image_date?: Date | null;
    location_id?: Location[] | null | number;
    trip_id: Trip | number;
    created_at: Date;
    updated_at: Date;
}
