import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartingPageComponent } from '../starting-page/starting-page.component';
import { NavBarComponent } from 'src/app/shared/components/nav-bar/nav-bar.component';
import { RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StartingPageComponent, NavBarComponent, RouterModule, RouterOutlet,  RouterLinkWithHref],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent {
     
}
