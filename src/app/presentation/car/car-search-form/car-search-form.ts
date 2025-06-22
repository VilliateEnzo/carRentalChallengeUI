import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  output,
  signal
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { InputTextComponent } from '../../shared/forms/input-text/input-text';
import { CarService } from '../../../application/services/car.service';
import { Car } from '../../../domain/Car';
import { ListCarsRequest } from '../../../domain/RequestModels/ListCarsRequest';

@Component({
  selector: 'app-car-search-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    InputTextComponent
  ],
  templateUrl: './car-search-form.html',
  styleUrl: './car-search-form.css'
})
export class CarSearchForm {
  private fb = inject(FormBuilder);
  private carService = inject(CarService);

  form = this.fb.group({
    address: ['', Validators.maxLength(70)],
    startDate: ['', Validators.required], //TODO: Should add a validator for startDate from the 
    endDate: ['', Validators.required],
    carType: [''],
    carBrand: ['']
  }, { validators: this.dateRangeValidator });

  carTypes = ['SUV', 'Sedan', 'Coupe', 'Convertible', 'Hatchback'];
  carBrands = ['Toyota', 'Peugeot', 'BMW', 'Palio', 'KIA'];

  readonly isSearching = signal(false);
  readonly cars = output<Car[]>();

  get addressControl(): FormControl {
    return this.form.get('address') as FormControl;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const request: ListCarsRequest = {
      startDate: new Date(value.startDate!).toISOString(),
      endDate: new Date(value.endDate!).toISOString(),
      address: value.address || undefined,
      carType: value.carType || undefined,
      carBrand: value.carBrand || undefined
    };

    //TODO: WE COULD IMPLEMENT A SPINNER FOR THIS isSearching.
    this.isSearching.set(true);
    this.carService.GetAvailableCars(request).subscribe({
      next: cars => {
        this.cars.emit(cars);
        this.isSearching.set(false);
      },
      error: err => {
        console.error('Failed to fetch available cars', err);
        this.isSearching.set(false);
      }
    });
  }

  private dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    return (start && end && start > end) ? { invalidDateRange: true } : null;
  }
}