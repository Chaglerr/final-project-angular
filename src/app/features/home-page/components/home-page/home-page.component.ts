import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { customPassValidator } from 'src/app/shared/validators/validators';
import { IUser, posts } from 'src/app/shared/interfaces/interfaces';
import { AuthorizationService } from 'src/app/shared/services/authorization-services/authorization.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(public formBuilder: FormBuilder, public userControl: AuthorizationService){};

  public detailedInfoForm = this.formBuilder.group({
    academicState: ['', Validators.required],
    subjectSelect: ['', Validators.required],
    availabilitySelect: ['', Validators.required],
    locationSelect: ['', Validators.required],
    languageSelect: ['', Validators.required],
    priceSelect: ['', Validators.required],
    description: [''],
  });

  allPosts: string[] = [];
  postsGeneric: posts[] = [];
  loggedInId: string = "";
  loggedInUser: IUser = {id: "-1", email: "", nickname: "", password: "", posts: []};
  

  ngOnInit(){
    this.loggedInId = this.userControl.currUserId;
    this.loggedInUser = this.userControl.getUser(this.loggedInId);
    //posts = getAllPosts()
  }


  defaultFormValues = {
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
    const data = this.detailedInfoForm.value;
    const genericNewPost = {academicState: data.academicState || "", subjectSelect: data.subjectSelect || "", availabilitySelect: data.availabilitySelect || "",
                          locationSelect: data.locationSelect || "", languageSelect: data.languageSelect || "", priceSelect: data.priceSelect || "", description: data.description || "" }
    this.postsGeneric.push(genericNewPost);
    this.loggedInUser.posts.push(newPost);
    this.allPosts.push(newPost);
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