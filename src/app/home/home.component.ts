import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../admin/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message: string;

  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    if(this.auth.statusAuthentication()) {
      console.log(this.router.url)
      this.router.navigate(['/admin'])
    }
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'Please login again'
      } else if(params['loginFailed']) {
        this.message = 'Authorization time has expired. Please login again'
      }else {
        this.message = ''
      }
    })
  }
}
