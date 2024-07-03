import { Component } from '@angular/core';
import { PasswordValidationService } from '../password-validation.service';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PasswordValidationResult} from "../password-validation-result.enum";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf, NgClass],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css'
})
export class PasswordFormComponent {
  applyForm = new FormGroup({
    password: new FormControl(''),
  });
  private validationResult: PasswordValidationResult | null = null;

  constructor(private passwordValidationService: PasswordValidationService) {
    this.applyForm.get('password')?.valueChanges.subscribe((value) => {
      console.log(value?.length)
      this.validationResult = this.passwordValidationService.validatePassword(value ?? '') ?? null;
    });
  }
  get validationMessage() {
    switch (this.validationResult) {
      case PasswordValidationResult.Strong:
        return 'Strong';
      case PasswordValidationResult.Medium:
        return 'Medium';
      case PasswordValidationResult.Easy:
        return 'Easy';
      case PasswordValidationResult.TooShort:
        return 'Too Short';
      case PasswordValidationResult.Empty:
        return null;
      default:
        return null;
    }
  }

  get validationBlocks() {
    switch (this.validationResult) {
      case PasswordValidationResult.Strong:
        return ['green', 'green', 'green'];
      case PasswordValidationResult.Medium:
        return ['yellow', 'yellow', 'gray'];
      case PasswordValidationResult.Easy:
        return ['red', 'gray', 'gray'];
      case PasswordValidationResult.TooShort:
        return ['red', 'red', 'red'];
      case PasswordValidationResult.Empty:
        return ['gray', 'gray', 'gray'];
      default:
        return ['gray', 'gray', 'gray'];
    }
  }
}
