import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from 'src/app/shared/services/authorization-services/authorization.service';
import { IUser } from 'src/app/shared/interfaces/interfaces';
import { HttpsService } from 'src/app/shared/services/http/https.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  
  currUserSubscription: Subscription;
  currUserId: string;
  userData: IUser = {id: "-1", email: "", nickname: "", password: "", posts: []};
  constructor(private userControl: AuthorizationService, private http: HttpsService){
    this.currUserId = this.userControl.currUserId;
    
    this.currUserSubscription = this.http.getUserById(this.currUserId).subscribe(
      (user: IUser) => {
        console.log('User Data:', user);
        this.userData = user;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
