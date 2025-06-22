import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Car } from '../../../domain/Car';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { CarResultListCard } from '../car-result-list-card/car-result-list-card';

@Component({
  selector: 'app-car-result-list',
  imports: [FlexLayoutModule, CarResultListCard],
  templateUrl: './car-result-list.html',
  styleUrl: './car-result-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarResultList {
  cars = input<Car[]>([]);
}
