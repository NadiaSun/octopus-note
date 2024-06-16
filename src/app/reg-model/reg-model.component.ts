import { Component, OnInit } from '@angular/core';
import { AuthService } from '../admin/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-model',
  templateUrl: './reg-model.component.html',
  styleUrls: ['./reg-model.component.scss']
})
export class RegModelComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    if(this.auth.statusAuthentication()) {
      console.log(this.router.url)
      this.router.navigate(['/admin'])
    }
  }

}
