export interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    location_image?: string | null;
    created_at: Date;
    updated_at: Date;
}