import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-starting-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartingPageComponent {

}
