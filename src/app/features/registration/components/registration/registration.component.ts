import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { passwordMatch,  validateNickname, customPassValidator } from '../../../../shared/validators/validators';
import { FormBuilder, FormControl, ValidationErrors, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/services/authorization-services/authorization.service';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(public formBuilder: FormBuilder,  public router: Router, private userControl: AuthorizationService){}

  public registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), customPassValidator]],
    confirmpassword: ['', Validators.required],
    nickname: ['', [Validators.required, validateNickname]],
    agreement: [false, [Validators.required, Validators.requiredTrue]]
  }, { validators: [passwordMatch] });

  public registration(): void{ 
    this.userControl.registerUser(this.registerForm.value);
    this.registerForm.reset();
    this.router.navigate(['/login']);
  }
}
