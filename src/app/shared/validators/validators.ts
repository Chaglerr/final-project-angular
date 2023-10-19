import { FormControl, ValidationErrors } from '@angular/forms';

export function passwordMatch(group: FormControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmpassword')?.value;

  return password === confirmPassword ? null : { mismatch: true };
}

export function validateNickname(control: FormControl): ValidationErrors | null {
  const nickname = control.value;
  const pattern = /^[a-zA-Z0-9-]*$/;

  if (pattern.test(nickname)) {
    return null;
  } else {
    return { invalidNickname: true };
  }
}
  
  export function customPassValidator(control: FormControl): ValidationErrors | null {
    const pattern = /^[a-zA-Z0-9]*$/;

    if (pattern.test(control.value)) {
      return null; 
    } else {
      return { invalidChars: true };
    }
  }


