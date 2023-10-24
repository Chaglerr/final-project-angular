import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, User } from 'src/app/shared/interfaces/interfaces';
import { AuthorizationService } from 'src/app/shared/services/authorization-services/authorization.service';
import { HttpsService } from 'src/app/shared/services/http/https.service';
import { customPassValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPanelComponent {


  currUserId: string = "-1";
  userData: IUser = {id: "-1", email: "", nickname: "", password: "", posts: [], rating: {ratedNum: 0, rating: 0}, isAdmin: false};
  selectedUser: IUser | null = null;
  allTheUsers: IUser[] = [];

  public addAdminForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), customPassValidator]],
  });


  constructor(private cdr: ChangeDetectorRef, public userControl: AuthorizationService, private http: HttpsService, public formBuilder: FormBuilder, private router: Router){}

  ngOnInit(){
    this.fetchData();
  }


  fetchData(){
    this.http.getUsers().subscribe(
      (data) => {
        this.allTheUsers = data;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error:', error);
      }
    )
  }

  private removeUserAndPosts(): void {
    if(this.selectedUser && (this.selectedUser.posts.length > 0)){
      for(let postObj of this.selectedUser?.posts){
        this.removePost(postObj.id, this.selectedUser);
        
      }
    }
    if(this.selectedUser) this.http.deleteUserWithId(this.selectedUser.id);
    setTimeout(() => {
      this.fetchData();
    }, 2000);
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
  }

  public adminUserRemover(user: IUser){
    this.selectedUser = user;
    console.log(this.selectedUser);   
    this.removeUserAndPosts();
  }

  public addAdmin(){
    if(!this.addAdminForm.valid) return;
    this.userControl.registerAdmin(this.addAdminForm.value as User);
    this.addAdminForm.reset();
    setTimeout(() => {
      this.fetchData();
    }, 2000);
  }


}
