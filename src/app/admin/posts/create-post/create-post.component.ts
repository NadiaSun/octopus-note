import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  constructor() {

  }
  
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.minLength(3),
        Validators.required
      ]),
      text: new FormControl(null, [
        Validators.minLength(20),
        Validators.required
      ])
    })
  }

  submit() {

  }
}
