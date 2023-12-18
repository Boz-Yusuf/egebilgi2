import { Component } from '@angular/core';
import { AuthService } from 'src/app/global/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService) { }
  signOut(): void { 
    try {
      this.authService.deleteAccessToken();
    } catch (error) {
      throw error;
    }
  }

}
