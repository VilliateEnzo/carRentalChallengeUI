import { UUID } from "crypto";

export interface Car {
    id: UUID;
    carType: string;
    model: string;
    address: string;
}

export interface ListCarsResponse {
    cars: Car[]
}