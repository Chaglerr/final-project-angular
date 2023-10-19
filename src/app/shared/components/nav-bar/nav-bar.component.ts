import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private router: Router){};

  public redirectToLoginPage(): void{
    this.router.navigate(['/login']);
  }


  public redirectToRegisterPage(): void{
    this.router.navigate(['/register']);
  }
}
