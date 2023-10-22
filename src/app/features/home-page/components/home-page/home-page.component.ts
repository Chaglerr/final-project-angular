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
    this.loggedInUser = { id: "-1", email: "", nickname: "", password: "", posts: [] };
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
    this.postsService.addPost(newPost, newId);
    const arr: IPost[] = this.loggedInUser.posts;
    
    const postObj = {content: newPost, id: newId}
    arr.push(postObj);
    const updated = this.loggedInUser;
    updated.posts = arr;
    console.log(updated);
    
    this.postsService.updatePostsOfUser(updated, newId);
    this.displayedPosts.push(newPost);
    this.detailedInfoForm.reset(this.defaultFormValues);
  
  }

  private generatePost(): string{ 
    const data = this.detailedInfoForm.value;
    if(!data.academicState || !data.availabilitySelect || !data.priceSelect || !data.subjectSelect || !data.locationSelect || !data.languageSelect) return "";
    let res = `Hello, my name is ${this.loggedInUser.nickname}, `;
    if(data.academicState === 'teach') res += `I'm here to help you with ${data.subjectSelect}. `;
    else if(data.academicState === 'learn') res += `I'm here to find someone who can help me with ${data.subjectSelect}. `;
    res += `My prefered time during the week is ${data.availabilitySelect}, as of the place of lessons, I would prefer ${data.locationSelect} and prefered language would be ${data.languageSelect}. For me acceptable price per lesson would be around ${data.priceSelect}. \n`
    if(data.description !== "") res += `Some additional information about me: ${data.description}`;
    return res;
  }

  public detailedSearch() {
    const searchData = this.detailedInfoForm.value;
    const filteredPosts = this.postsGeneric.filter((post) => {
      return (
        (!searchData.academicState || post.academicState === searchData.academicState) &&
        (!searchData.subjectSelect || post.subjectSelect === searchData.subjectSelect) &&
        (!searchData.availabilitySelect || post.availabilitySelect === searchData.availabilitySelect) &&
        (!searchData.locationSelect || post.locationSelect === searchData.locationSelect) &&
        (!searchData.languageSelect || post.languageSelect === searchData.languageSelect) &&
        (!searchData.priceSelect || post.priceSelect === searchData.priceSelect) &&
        (!searchData.description || post.description.includes(searchData.description))
      );
    });
    //use data, works good :)
    console.log(filteredPosts);
  }
}