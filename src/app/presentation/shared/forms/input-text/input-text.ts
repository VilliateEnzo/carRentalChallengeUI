import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-text',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input-text.html',
  styleUrl: './input-text.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent {
  label = input<string>();
  type = input<'text' | 'email' | 'password'>('text');
  control = input.required<FormControl>();
}
