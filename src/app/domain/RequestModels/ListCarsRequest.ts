export interface ListCarsRequest {
    startDate: string;
    endDate: string;
    address?: string;
    carType?: string;
    carBrand?: string;
}