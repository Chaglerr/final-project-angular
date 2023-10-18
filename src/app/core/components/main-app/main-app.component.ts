import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartingPageComponent } from '../starting-page/starting-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StartingPageComponent],
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent {

}
