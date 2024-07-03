import {Injectable} from '@angular/core';
import {PasswordValidationResult} from './password-validation-result.enum';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidationService {

  constructor() {}

  validatePassword(password: string): PasswordValidationResult {
    let result = 0;
    const minLength = 8;
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (password.length < minLength) {
      return password.length === 0 ? PasswordValidationResult.Empty : PasswordValidationResult.TooShort;
    }

    if (hasNumber.test(password)) {
      result++;
    }

    if (hasLetter.test(password)) {
      result++;
    }

    if (hasSpecial.test(password)) {
      result++;
    }

    switch (result) {
      case 1:
        return PasswordValidationResult.Easy;
      case 2:
        return PasswordValidationResult.Medium;
      case 3:
        return PasswordValidationResult.Strong;
      default:
        return PasswordValidationResult.Easy;
    }
  }
}
