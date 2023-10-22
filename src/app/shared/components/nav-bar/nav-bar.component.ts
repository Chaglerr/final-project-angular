import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization-services/authorization.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent{

  constructor(private router: Router, private userControl: AuthorizationService){
    userControl.currentState.subscribe(
      (data) => {
        this.loggedIn = (data.currentUserId == "-1" ? false : true);
      }
    );
  };

  public loggedIn: boolean = false;
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.userControl.currentState.subscribe((userState)=>{
      userState.currentUserId === "-1" ? this.loggedIn = false : this.loggedIn = true;
    })
  }

  
  ngOnDestroy(): void {
    (this.subscription as Subscription).unsubscribe();
  }


  public redirectToLoginPage(): void{
    this.router.navigate(['/login']);
  }


  public redirectToRegisterPage(): void{
    this.router.navigate(['/register']);
  }

  public redirectToLandingPage(): void{
    this.router.navigate(['/']);
  }
  public redirectToHomePage(): void{
    this.router.navigate(['/homepage']);
  }

  public redirectToMyProfile(): void{
    this.router.navigate(['/myprofile']);
  }

  public logOut(): void{
    this.userControl.logOut();
    this.userControl.currUserId = "-1";
    this.redirectToLandingPage();
  }
}
