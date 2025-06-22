import { map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../domain/User';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Car, ListCarsResponse } from '../../domain/Car';
import { ListCarsRequest } from '../../domain/RequestModels/ListCarsRequest';

@Injectable({
  providedIn: 'root'
})
export class CarService {
    private http: HttpClient = inject(HttpClient);
    private baseUrl: string = environment.apiUrl;

    constructor() {}

    GetAvailableCars(model: ListCarsRequest): Observable<Car[]> {
        const url = `${this.baseUrl}/cars`;

        let params = new HttpParams()
        .set('StartDate', model.startDate)
        .set('EndDate', model.endDate);

        if (model.address) {
            params = params.set('Address', model.address);
        }

        if (model.carType) {
            params = params.set('Type', model.carType);
        }

        if (model.carBrand) {
            params = params.set('Model', model.carBrand);
        }

        return this.http.get<ListCarsResponse>(url, { params })
        .pipe(map(response => response.cars));;
    }
}