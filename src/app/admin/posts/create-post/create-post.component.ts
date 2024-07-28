import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';
import { PostService } from '../../shared/post.service';
import { Subject, auditTime, debounceTime} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  private text$: Subject<string> = new Subject<string>()

  message: string = '';
  savedMessage: string = ''
  constructor(
    private post: PostService,
    private router: Router
  ) {

  }
  
  form: FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(localStorage.getItem('title') || '', [
        Validators.required
      ]),
      text: new FormControl(localStorage.getItem('text') || '', [
        Validators.required
      ])
    })

    this.text$
    .pipe(auditTime(10000))
    .subscribe(() => {
      this.saveValue()
    })
  }

  saveValue() {
    if(this.form.value.title !== null) {
      localStorage.setItem('title', this.form.value.title)
      this.savedMessage = new Date().toString()
    }
    if(this.form.value.text !== null) {
      localStorage.setItem('text', this.form.value.text)
      this.savedMessage = new Date().toString()
    }
  }

  onContentChanged() {
    this.text$.next('text')
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date(),
    }
    if(this.post.checkAuth(post)) {
      console.log(this.post)
      this.post.add(post).subscribe((response) => {
        this.form.reset()
        this.router.navigate([''])
        console.log(response)
        this.message = `«${response.title}» published`
        localStorage.removeItem('title')
        localStorage.removeItem('text')
        setTimeout(() => {
          this.message = ""
          this.savedMessage = ""
        }, 3000)
      })
    } else {
      this.saveValue()
    }
  }
}
