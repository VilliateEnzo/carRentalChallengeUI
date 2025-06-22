import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CarSearchForm } from '../../car/car-search-form/car-search-form';
import { Car } from '../../../domain/Car';
import { CarResultList } from "../../car/car-result-list/car-result-list";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CarSearchForm,
    CarResultList
]
})
export class DashboardLayout {
  readonly cars = signal<Car[]>([]);

  onCarsReceived(cars: Car[]) {
    console.log('Received in Dashboard:', cars);
    this.cars.set(cars);
  }
}