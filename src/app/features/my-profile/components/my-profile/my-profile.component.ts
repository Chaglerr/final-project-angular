import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from 'src/app/shared/services/authorization-services/authorization.service';
import { IPost, IUser, User } from 'src/app/shared/interfaces/interfaces';
import { HttpsService } from 'src/app/shared/services/http/https.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { customPassValidator, validateNickname,  } from 'src/app/shared/validators/validators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  
  currUserSubscription: Subscription = new Subscription();
  currUserId: string = "-1";
  userData: IUser = {id: "-1", email: "", nickname: "", password: "", posts: [], rating: {ratedNum: 0, rating: 0}, isAdmin: false};
  
  constructor(public userControl: AuthorizationService, private http: HttpsService, public formBuilder: FormBuilder, private router: Router){}

  
  public updateForm = this.formBuilder.group({
    id: '',
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), customPassValidator]],
    confirmpassword: ['', Validators.required],
    nickname: ['', [Validators.required, validateNickname]],
  });
  isEditing = false;

  selectedUser: IUser | null = null;
  showConfirm = false;


  ngOnInit(){
    this.currUserId = this.userControl.currUserId;
    this.fetchData();
    
  }

  fetchData(){
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



  showConfirmation(user: IUser): void{
    this.selectedUser = user;
    this.showConfirm = true;
  }

  removeUser(): void {
    this.removeUserAndPosts();
    this.showConfirm = false;
    this.selectedUser = null;

    if(!this.isEditing) {
      this.userControl.logOut();
      this.userControl.currUserId = "-1";
      this.router.navigateByUrl("/");
    }
  }


  private removeUserAndPosts(): void {
    if(this.selectedUser){
      for(let postObj of this.selectedUser?.posts){
        this.removePost(postObj.id, this.selectedUser);
      }
    }
    this.http.deleteUserWithId(this.currUserId);
  }

  public removePost(id: string, user: IUser){
    this.selectedUser = user;
    this.http.deletePostWithId(id);
    if (this.selectedUser) {
    const postIndex = this.selectedUser.posts.findIndex((postObj) => postObj.id === id);
      if (postIndex !== -1) {
        this.selectedUser.posts.splice(postIndex, 1);
        this.http.updateUserPosts(this.selectedUser.id, this.selectedUser);
        console.log(`Post with ID ${id} has been removed from selectedUser's posts.`);
      } else {
        console.log(`Post with ID ${id} not found in selectedUser's posts.`);
      }
    }
    this.fetchData();
  }


  cancelRemove(): void{
    this.showConfirm = false;
    this.selectedUser = null;
  }

  

  onUpdate(): void {
    const updatedUser = this.updateForm.value as User;
    if(this.updateForm.value.confirmpassword === updatedUser.password){
      const index = this.userControl.currUserId;
      
      const updatedIUser = {...updatedUser, id: index};
      this.http.updateUserPosts(index, updatedIUser);
      this.fetchData();
      this.updateForm.reset();
      this.isEditing = false;
    }
  }
  
  
  editUser(user: User): void{
    this.updateForm.setValue({
    id: this.userControl.currUserId,
    email: user.email,
    password: user.password, 
    confirmpassword: user.password,
    nickname: user.nickname,
    });
    this.isEditing = true;
  }

}
