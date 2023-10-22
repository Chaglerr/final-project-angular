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
    console.log('Posting data:', post); // Add this line for debugging
    this.http.savePostsToServer(post).subscribe(
      (response) => {
        // Handle the response from the server, if needed
        console.log('Post response:', response);
      },
      (error) => {
        console.error('Error posting data:', error);
      }
    );
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
