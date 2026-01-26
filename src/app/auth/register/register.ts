import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule, NgClass, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterPageComponent {
  password = '';
  passwordConfirm = '';

  get passwordStrengthLabel(): string {
    const score = this.passwordStrengthScore;
    if (!this.password) {
      return 'Enter a password to check strength.';
    }
    if (score <= 1) {
      return 'Weak password.';
    }
    if (score === 2) {
      return 'Fair password.';
    }
    return 'Strong password.';
  }

  get passwordStrengthScore(): number {
    let score = 0;
    if (this.password.length >= 8) {
      score += 1;
    }
    if (/[A-Z]/.test(this.password) && /[a-z]/.test(this.password)) {
      score += 1;
    }
    if (/\d/.test(this.password)) {
      score += 1;
    }
    if (/[^A-Za-z0-9]/.test(this.password)) {
      score += 1;
    }
    return Math.min(score, 3);
  }

  get passwordsMatch(): boolean {
    return this.password.length > 0 && this.password === this.passwordConfirm;
  }
}
