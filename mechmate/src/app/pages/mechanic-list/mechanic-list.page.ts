import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-mechanic-list',
  templateUrl: './mechanic-list.page.html',
  styleUrls: ['./mechanic-list.page.scss'],
})
export class MechanicListPage implements OnInit {
  mechanics: any[] = []; // Stores all the mechanics

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) {
  }

  ngOnInit() {
    // Get all mechanics from the database
    this.authService.getUserId().then((userId) => {
      console.log("Test: " + userId);
    });
    this.firestore
      .collection('mechanics')
      .valueChanges()
      .subscribe((mechanics: any[]) => {
        this.mechanics = mechanics;
      });
  }
}
