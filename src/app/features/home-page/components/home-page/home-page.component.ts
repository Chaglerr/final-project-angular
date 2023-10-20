import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { customPassValidator } from 'src/app/shared/validators/validators';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(public formBuilder: FormBuilder){};

  public detailedInfoForm = this.formBuilder.group({
    levelSelect: ['', Validators.required],
    subjectSelect: ['', Validators.required],
    availabilitySelect: ['', Validators.required],
    locationSelect: ['', Validators.required],
    languageSelect: ['', Validators.required],
    priceSelect: ['', Validators.required],
    description: ['', Validators.required],
  });
}



















//  TO DELETE
// constructor(private userControl: AuthorizationService){};
//     loggedInId: string = "";
//     loggedInUser: IUser = {id: "-1", email: "", nickname: "", password: "", posts: []};

//     ngOnInit(){
//       this.loggedInId = this.userControl.currUserId;
//       this.loggedInUser = this.userControl.getUser(this.loggedInId);
//     }
