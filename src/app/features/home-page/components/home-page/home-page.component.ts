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

  allPosts: posts[] = [];
  loggedInId: string = "";
  loggedInUser: IUser = {id: "-1", email: "", nickname: "", password: "", posts: []};
  

  ngOnInit(){
    this.loggedInId = this.userControl.currUserId;
    this.loggedInUser = this.userControl.getUser(this.loggedInId);
    //posts = getAllPosts()
  }

  public postInfo(){
    let newPost = this.generatePost();
    console.log(newPost);
    
    
  }

  private generatePost(): string{
    const data = this.detailedInfoForm.value;
    let res = `Hello, my name is ${this.loggedInUser.nickname}, `;
    console.log(data.academicState);
    
    if(data.academicState === 'teach') res += `I'm here to help you with ${data.subjectSelect}. `;
    if(data.academicState === 'learn') res += `I'm here to find someone who can help me with ${data.subjectSelect}. `;
    res += `My prefered time during the week is ${data.availabilitySelect}, as of the place of lessons, I would prefer ${data.locationSelect} and prefered language would be ${data.languageSelect}. For me acceptable price per lesson would be around ${data.priceSelect}. \n`
    if(data.description !== "") res += `Some additional information about me: ${data.description}`;
    return res;
  }

 
}



















//  TO DELETE
// constructor(private userControl: AuthorizationService){};
//     loggedInId: string = "";
//     loggedInUser: IUser = {id: "-1", email: "", nickname: "", password: "", posts: []};

//     ngOnInit(){
//       this.loggedInId = this.userControl.currUserId;
//       this.loggedInUser = this.userControl.getUser(this.loggedInId);
//     }
