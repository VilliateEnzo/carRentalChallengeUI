import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../application/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../../domain/RequestModels/LoginRequest';
import { RegisterRequest } from '../../../domain/RequestModels/RegisterRequest';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputTextComponent } from '../../shared/forms/input-text/input-text';

@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputTextComponent
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  authService: AuthService = inject(AuthService);
  form: FormGroup = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', [Validators.required, Validators.maxLength(20)]], 
    lastName: ['', [Validators.required, Validators.maxLength(20)]], 
    address: ['', [Validators.required, Validators.maxLength(20)]], 
  });

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }
  
  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }  

  get firstNameControl(): FormControl {
    return this.form.get('firstName') as FormControl;
  }
  
  get lastNameControl(): FormControl {
    return this.form.get('lastName') as FormControl;
  } 
  
  get addressControl(): FormControl {
    return this.form.get('address') as FormControl;
  }  

  onSubmit(): void {
    if (this.form.valid) {
      const registerRequest: RegisterRequest = {
        email: this.emailControl.value,
        password: this.passwordControl.value,
        firstName: this.firstNameControl.value,
        lastName: this.lastNameControl.value,
        address: this.addressControl.value
      };

      this.authService.register(registerRequest).subscribe({
        next: () => {
          console.log('register successful!');
        },
        error: (err) => {
          console.error('register failed:', err);
        }
    });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
