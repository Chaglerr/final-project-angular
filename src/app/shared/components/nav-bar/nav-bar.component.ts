import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization-services/authorization.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent{

  public loggedIn: boolean = false;
  private subscription: Subscription | undefined;
  public isAdmin: boolean = false;
  
  isMobileMenuOpen: boolean = false;
  isWideScreen: boolean = true;
  constructor(private router: Router, private userControl: AuthorizationService, private cdr: ChangeDetectorRef){
    
  };
  

  
  ngOnInit(): void {
    this.checkScreenWidth();
    this.subscription = this.userControl.currentState.subscribe((userState)=>{
      userState.currentUserId === "-1" ? this.loggedIn = false : this.loggedIn = true;
      this.isAdmin = userState.isAdmin;
      this.cdr.markForCheck();
    })
   
    
  }
  toggleMobileMenu(){
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    this.isWideScreen = window.innerWidth > 768; // Adjust the breakpoint as needed
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

  public redirectToAdminPanel(): void{
    this.router.navigate(['/adminpanel']);
  }

  public logOut(): void{
    this.userControl.logOut();
    this.userControl.currUserId = "-1";
    this.redirectToLandingPage();
  }
}
