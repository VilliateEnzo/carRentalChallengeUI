import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-home-layout',
  imports: [MatButtonModule, FlexLayoutModule],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLayout {
  router: Router = inject(Router)

  constructor() {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
