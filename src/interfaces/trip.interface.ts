
export interface Trip {
    id: number;
    name: string;
    description?: string | null;
    trip_image?: string | null;
    start_date: Date;
    end_date?: Date | null;
    created_at: Date;
    updated_at: Date;
}