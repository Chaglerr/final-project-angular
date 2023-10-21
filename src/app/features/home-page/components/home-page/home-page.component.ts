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
    this.loggedInUser.posts.push(newPost);
    this.allPosts.push(newPost);
  
    this.detailedInfoForm.reset(this.defaultFormValues);
    //console.log(newPost);
  }

  private generatePost(): string{
    const data = this.detailedInfoForm.value;
    let res = `Hello, my name is ${this.loggedInUser.nickname}, `;
    if(data.academicState === 'teach') res += `I'm here to help you with ${data.subjectSelect}. `;
    else if(data.academicState === 'learn') res += `I'm here to find someone who can help me with ${data.subjectSelect}. `;
    else return "";
    if(!data.availabilitySelect || !data.priceSelect || !data.subjectSelect || !data.locationSelect || !data.languageSelect) return "";
    
    if(data.availabilitySelect === 'Select Availability') return "";
    res += `My prefered time during the week is ${data.availabilitySelect}, as of the place of lessons, I would prefer ${data.locationSelect} and prefered language would be ${data.languageSelect}. For me acceptable price per lesson would be around ${data.priceSelect}. \n`
    if(data.description !== "") res += `Some additional information about me: ${data.description}`;
    return res;
  }

 
}