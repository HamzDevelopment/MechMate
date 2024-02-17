import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  selectedUser: string; // Email of the user to make mechanic
  users: any[]; // All users for selection
  mechanicUsers: any[] = []; // All users with mechanic status

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    // Get all users from the database
    this.firestore.collection('users').valueChanges().subscribe((users: any[]) => {
      this.users = users;
      this.mechanicUsers = users.filter((user) => user.isMechanic === true);
    });
  }

  makeUserMechanic() {
    // Make the selected user a mechanic
    if (this.selectedUser) {
      this.firestore
        .collection('users', (ref) => ref.where('email', '==', this.selectedUser))
        .get()
        .subscribe((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({ isMechanic: true });
          });
        });
    }
  }

  removeMechanicStatus(email: string) {
    // Remove mechanic status from the selected user
    this.firestore
      .collection('users', (ref) => ref.where('email', '==', email))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ isMechanic: false });
        });
      });
  }

}
