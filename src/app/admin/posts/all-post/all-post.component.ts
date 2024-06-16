import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { PostService } from '../../shared/post.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit, OnDestroy {
  posts: Post[]
  pSub: Subscription

  constructor(
    private post: PostService,
  ){}
  
  ngOnInit(): void {
    this.pSub = this.post.getAll().subscribe(response => {
      this.posts = response.reverse()

    })
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe
    }
  }

  deletePost(key?: string) {
    if(key) {
      !this.post.checkAuth() ? null : 
      this.post.delete(key).subscribe(response => {
          this.posts = this.posts.filter(post => post.id !== key)
        })
    }
  }

}
