import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: any // Stores the email address

  constructor(public authService: AuthenticationService, public route: Router) { }

  ngOnInit() {
  }

  // Reset the password
  async resetPassword() {
    this.authService.resetPassword(this.email).then(() => {
      this.route.navigate(['/login'])
    }).catch((error) => {
      console.log(error);
    })
  }
}
