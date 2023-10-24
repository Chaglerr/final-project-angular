import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { passwordMatch,  validateNickname, customPassValidator } from '../../../../shared/validators/validators';
import { FormBuilder, FormControl, ValidationErrors, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/services/authorization-services/authorization.service';
import { HttpsService } from 'src/app/shared/services/http/https.service';
import { User } from 'src/app/shared/interfaces/interfaces';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  constructor(public formBuilder: FormBuilder,  public router: Router, 
    private userControl: AuthorizationService, private http: HttpsService){}

  public registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), customPassValidator]],
    confirmpassword: ['', Validators.required],
    nickname: ['', [Validators.required, validateNickname]],
    agreement: [false, [Validators.required, Validators.requiredTrue]]
  }, { validators: [passwordMatch] });

  public registration(): void{ 
    if(!this.registerForm.valid) return;
    this.userControl.registerUser(this.registerForm.value as User);
    this.registerForm.reset();
    this.router.navigate(['/login']);
  }
}
