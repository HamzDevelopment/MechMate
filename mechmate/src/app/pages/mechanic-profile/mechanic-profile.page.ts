import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-mechanic-profile',
  templateUrl: './mechanic-profile.page.html',
  styleUrls: ['./mechanic-profile.page.scss'],
})
export class MechanicProfilePage implements OnInit {
  mechanicForm: FormGroup; // Stores the mechanic profile form
  mechanicProfile: any; // Stores the mechanic profile

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.mechanicForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      mobile: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Get the file

    if (file) {
      const fileName = `${Date.now()}_${file.name}`; // Create a unique file name

      const filePath = `mechanic_images/${fileName}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(file);

      // Upload the file to the storage bucket
      uploadTask.snapshotChanges().subscribe(
        (snapshot) => {
          if (snapshot.state === 'success') {
            storageRef.getDownloadURL().subscribe((downloadURL) => {
              this.mechanicForm.patchValue({ image: downloadURL }); // Update the form with the image URL
            });
          }
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  ngOnInit() {
    // Get the mechanic profile
    this.authService.getUserId().then((userId) => {
      if (userId) {
        const mechanicRef = this.firestore.collection('mechanics').doc(userId);
        
        mechanicRef.get().subscribe((doc) => {
          if (doc.exists) {
            this.mechanicProfile = doc.data();
            this.mechanicForm.setValue({
              name: this.mechanicProfile.name,
              location: this.mechanicProfile.location,
              mobile: this.mechanicProfile.mobile,
              type: this.mechanicProfile.type,
              description: this.mechanicProfile.description,
              image: this.mechanicProfile.image,
            });
          } else {
            // Create a default profile if one does not exist
            const defaultProfile = {
              name: '',
              location: '',
              mobile: '',
              type: '',
              description: '',
              image: '',
            };

            mechanicRef.set(defaultProfile).then(() => {
              this.mechanicProfile = defaultProfile;
              this.mechanicForm.setValue(defaultProfile);
            });
          }
        });
      }
    });
  }

  async saveProfile() {
    // Save the mechanic profile
    const userId = await this.authService.getUserId();

    if (this.mechanicForm.valid && userId) {
      const mechanicProfile = {
        name: this.mechanicForm.value.name,
        location: this.mechanicForm.value.location,
        mobile: this.mechanicForm.value.mobile,
        type: this.mechanicForm.value.type,
        description: this.mechanicForm.value.description,
        image: this.mechanicForm.value.image,
      };
      // Update the mechanic profile
      this.firestore
        .collection('mechanics')
        .doc(userId)
        .update(mechanicProfile)
        .then(() => {
          console.log('Mechanic profile updated successfully!');
          this.router.navigate(['/mechanic-list']);
        })
        .catch((error) => {
          console.error('Error updating mechanic profile:', error);
        });
    }
  }
}
