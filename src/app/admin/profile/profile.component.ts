import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  posts: Post[]
  pSub: Subscription

  constructor(private post: PostService){}
  
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

  getLastDate(): number {
    return this.posts
    .map(post => new Date(post.date).getTime())[this.posts.length - 1]

    // .sort((a: number, b: number) => a > b ? 1 : -1)[this.posts.length - 1]
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
