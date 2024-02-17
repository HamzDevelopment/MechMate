import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { adminEmails } from 'src/app/config';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  user: any;
  isMechanic: boolean = false; // Stores the mechanic status of the user
  isAdmin: boolean = false; // Stores the admin status of the user
  userIsLoggedIn: boolean = false; // Stores the login status of the user

  // Features to display on the landing page gets passed into the feature list component
  features = [
    {
      icon: 'construct',
      title: 'Find Local Mechanics',
      description: 'Easily discover nearby mechanics with detailed profiles.',
    },
    {
      icon: 'pulse',
      title: 'Diagnostic AI',
      description: 'Use AI-powered diagnostics to identify and troubleshoot vehicle issues based on user input.',
    },
    {
      icon: 'car-sport',
      title: 'Flexible Service Options',
      description: 'See between call-out or in-garage services.',
    },
    {
      icon: 'person',
      title: 'Mechanic Profiles',
      description: 'Mechanics can create, edit, and manage their profiles, showcasing their expertise.',
    },
    {
      icon: 'construct-outline',
      title: 'Maintenance History',
      description: 'Keep track of your vehicle maintenance and repair history.',
    },
  ];

  constructor(public authService: AuthenticationService, public route: Router, private firestore: AngularFirestore) {
    this.user = authService.getProfile()
  }

  ngOnInit() {
    // Check if the user is logged in
    this.authService.isUserLoggedIn().then((loggedIn) => {
      this.userIsLoggedIn = loggedIn;
      // Check if the user is a mechanic
      this.authService.getUserId().then((userId) => {
        if (userId) {
          this.firestore
            .collection('users')
            .doc(userId)
            .valueChanges()
            .subscribe((userData: any) => {
              this.isMechanic = userData.isMechanic || false;
            });
        }
      });
      // Check if the user is an admin
      this.authService.getProfile().then((userProfile: any) => {
        if (userProfile && userProfile.email) {
          this.isAdmin = adminEmails.includes(userProfile.email);
        }
      });
    });
  }

  async logOut() {
    // Log the user out
    this.authService.signOut().then(() => {
      this.route.navigate(['/login'])
      window.location.reload();
    })
  }
}
