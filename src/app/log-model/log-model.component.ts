import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../admin/shared/interfaces';
import { AuthService } from '../admin/shared/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-log-model',
  templateUrl: './log-model.component.html',
  styleUrls: ['./log-model.component.scss']
})
export class LogModelComponent implements OnInit{

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  form: FormGroup;
  submitted = false;
  message = ''

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginUser']) {
        this.message = 'Please sign in'
      } else {
        this.message = ''
      }
    })
    
    if(this.auth.statusAuthentication()) {
      console.log(this.router.url)
      this.router.navigate(['/admin'])
    }
    
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required
      ])
    })

  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}
