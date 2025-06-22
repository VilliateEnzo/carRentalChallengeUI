import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Car } from '../../../domain/Car';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-car-result-list-card',
  imports: [MatCardModule],
  templateUrl: './car-result-list-card.html',
  styleUrl: './car-result-list-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarResultListCard {
  car = input.required<Car>();
}
