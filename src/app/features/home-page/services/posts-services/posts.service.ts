import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPost, IUser } from 'src/app/shared/interfaces/interfaces';
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

  addPost(content: string, newId: string, userId: string): void {
    const post: IPost = {
      id: newId,
      content: content,
      userId: userId
    };
    console.log('Posting data:', post); 
    this.http.savePostsToServer(post).subscribe(
      (response) => {
        console.log('Post response:', response);
      },
      (error) => {
        console.error('Error posting data:', error);
      }
    );
    this.posts.push(post);
  }

  updatePostsOfUser(user: IUser, newId: string){
    const id = user.id;
    this.http.updateUserPosts(id, user);
  }

  

  getPostsToDisplay(): IPost[] {
    let res = [];
    for(let i = 0; i < this.posts.length; i++){
      res.push(this.posts[i]);
    }
    return res;
  }
}
