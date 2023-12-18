import { Component } from '@angular/core';
import { Credentials } from '../models/signIn.model';
import { ApiCallsService } from '../service/api-calls.service';
import { AuthService } from 'src/app/global/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(
    private apiCallService: ApiCallsService,
    private authService: AuthService,
    private router: Router
  ) {}
  userCredentials = new Credentials('', '', false);

  onSubmit(): void {
    this.sendCredentials();
    this.clearInputs();
  }

  clearInputs(): void {
    this.userCredentials.username = '';
    this.userCredentials.password = '';
  }

  sendCredentials(): string | void {
    try {
      this.apiCallService.postCredentials(this.userCredentials).subscribe(
        (response) => {
          const tokenValue = response.access_token;
          this.authService.setAccessToken(tokenValue);
          this.router.navigate(['/']);
        },
        (error) => {
          //todo  uyarilari ver
          console.error(error);
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
