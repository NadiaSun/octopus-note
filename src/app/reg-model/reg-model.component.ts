import { Component, OnInit } from '@angular/core';
import { AuthService } from '../admin/shared/auth.service';
import { Router } from '@angular/router';

import { User } from '../admin/shared/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg-model',
  templateUrl: './reg-model.component.html',
  styleUrls: ['./reg-model.component.scss']
})
export class RegModelComponent implements OnInit {
  
  constructor(public auth: AuthService, private router: Router) {}
  
  form: FormGroup;
  submitted = false;


  ngOnInit(): void {
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

    this.auth.register(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['login'], {
        queryParams: {
          loginUser: true
        }
      })
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }

}
