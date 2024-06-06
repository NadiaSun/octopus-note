import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-menu-layout',
  templateUrl: './selection-menu-layout.component.html',
  styleUrls: ['./selection-menu-layout.component.scss']
})
export class SelectionMenuLayoutComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout(event: Event) {
    event.preventDefault
    this.auth.logout()
    this.router.navigate(['/'])
  }
}
