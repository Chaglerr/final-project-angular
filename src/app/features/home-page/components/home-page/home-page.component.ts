import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { customPassValidator } from 'src/app/shared/validators/validators';
import { IPost, IUser, posts } from 'src/app/shared/interfaces/interfaces';
import { AuthorizationService } from 'src/app/shared/services/authorization-services/authorization.service';
import { HttpsService } from 'src/app/shared/services/http/https.service';
import { PostsService } from '../../services/posts-services/posts.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  
  displayedPosts: string[];
  postsGeneric: posts[];
  loggedInId: string;
  loggedInUser: IUser;

  constructor(public formBuilder: FormBuilder, public userControl: AuthorizationService, private http: HttpsService, private postsService: PostsService){
    this.displayedPosts = [];
    this.postsGeneric = [];
    this.loggedInId = "";
    this.loggedInUser = { id: "-1", email: "", nickname: "", password: "", posts: [], rating: {ratedNum: 0, rating: 0} };
  };

  public detailedInfoForm = this.formBuilder.group({
    academicState: ['', Validators.required],
    subjectSelect: ['', Validators.required],
    availabilitySelect: ['', Validators.required],
    locationSelect: ['', Validators.required],
    languageSelect: ['', Validators.required],
    priceSelect: ['', Validators.required],
    description: [''],
  });

  
  

  ngOnInit() {
    this.loggedInId = this.userControl.currUserId;

    this.http.getUserById(this.loggedInId).subscribe(
      (user: IUser) => {
        this.loggedInUser = user;
      },
      (error) => {
        console.error('Error while getting user:', error);
      }
    );
    this.http.getPosts().subscribe(
      (posts: IPost[]) => {
        this.postsService.posts = posts;
        this.displayedPosts = this.postsService.getPostsToDisplay();
      },
      (error) => {
        console.error('Error while getting posts:', error);
      }
    );
  }


  private readonly defaultFormValues = {
    academicState: '', 
    subjectSelect: '',
    availabilitySelect: '',
    locationSelect: '',
    languageSelect: '',
    priceSelect: '',
    description: '',
  };

  public postInfo(){
    let newPost = this.generatePost();
    if(newPost === "") return;
    const newId = `${crypto.randomUUID()}`;
    this.postsService.addPost(newPost, newId, this.loggedInId);
    const arr: IPost[] = this.loggedInUser.posts;
    
    const postObj = {content: newPost, id: newId, userId: this.loggedInId}
    arr.push(postObj);
    const updated = this.loggedInUser;
    updated.posts = arr;
    console.log(updated);
    
    this.postsService.updatePostsOfUser(updated, newId);
    this.displayedPosts.push(newPost);
    this.detailedInfoForm.reset(this.defaultFormValues);
  
  }

  private generatePost(): string {
    const data = this.detailedInfoForm.value;
    if (!data.academicState || !data.availabilitySelect || !data.priceSelect || !data.subjectSelect || !data.locationSelect || !data.languageSelect) {
      return "";
    }
    const academicStateText = data.academicState === 'teach' ? 'I can teach' : 'I want to learn';
    const subjectText = data.subjectSelect === 'other' ? `about ${data.description}` : `You ${data.subjectSelect}`;
    const availabilityText = `on ${data.availabilitySelect}`;
    const locationText = data.locationSelect === 'online' ? 'online' : `in ${data.locationSelect}`;
    const languageText = data.languageSelect === 'otherLanguage' ? `in ${data.description}` : `in ${data.languageSelect}`;
    const priceText = data.priceSelect === 'other' ? `Price negotiable` : `Only for ${data.priceSelect}$ per lesson`;
    let res = `Hello, my name is ${this.loggedInUser.nickname}. ${academicStateText} ${subjectText}. I'm available ${availabilityText}, prefer ${locationText}, and can communicate ${languageText}. ${priceText}.`;
    if (data.description) {
      res += ` Additional information: ${data.description}`;
    }
    return res;
  }

  public detailedSearch() {
    const searchData = this.detailedInfoForm.value;
    if (Object.values(searchData).every(value => value === '')) {
      this.displayedPosts = this.postsService.getPostsToDisplay();
    } else {
      this.displayedPosts = this.postsService.getPostsToDisplay().filter(post => {
        return (
          (!searchData.academicState || post.includes(searchData.academicState)) &&
          (!searchData.subjectSelect || post.includes(searchData.subjectSelect)) &&
          (!searchData.availabilitySelect || post.includes(searchData.availabilitySelect)) &&
          (!searchData.locationSelect || post.includes(searchData.locationSelect)) &&
          (!searchData.languageSelect || post.includes(searchData.languageSelect)) &&
          (!searchData.priceSelect || post.includes(searchData.priceSelect)) &&
          (!searchData.description || post.includes(searchData.description))
        );
      });
    }
    this.detailedInfoForm.reset(this.defaultFormValues);
  }

  public openUserPopup(post: IPost){

  }
}