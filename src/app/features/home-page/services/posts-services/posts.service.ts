import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces/interfaces';
import { HttpsService } from 'src/app/shared/services/http/https.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor(private http: HttpsService) { 

  }

  ngOnInit(){
    this.http.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  public posts: IPost[] = [];
  public toDisplayPosts: string[] = [];

  addPost(content: string): void {
    const post: IPost = {
      id: `${crypto.randomUUID()}`,
      content: content
    };
    this.http.savePostsToServer(post);
    this.posts.push(post);
  }

  getPostsToDisplay(): string[] {
    let res = [];
    for(let i = 0; i < this.posts.length; i++){
      res.push(this.posts[i].content);
      console.log(this.posts[i].content);
      console.log(1);
      
    }
    return res;
  }
}
