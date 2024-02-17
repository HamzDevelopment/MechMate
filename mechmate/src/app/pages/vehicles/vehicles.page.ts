import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
  userId: string | undefined; // Stores the user ID
  vehicleInfo: any[] = []; // Stores the vehicle information
  maintenanceHistory: any[] = []; // Stores the maintenance history

  vehicleForm: FormGroup = new FormGroup({}); // Stores the vehicle form

  constructor(
    private authService: AuthenticationService,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // Initialize the vehicle form
    this.vehicleForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      registration: ['', Validators.required],
      date: ['', Validators.required],
      serviceType: ['', Validators.required],
      cost: ['', Validators.required],
      otherInfo: ['']
    });

    this.authService.getUserId().then((userId) => {
      this.userId = userId!; // Get the user ID

      // Get the vehicle information and maintenance history for the user
      this.firestore.collection('vehicles', ref => ref.where('userId', '==', userId))
        .valueChanges()
        .subscribe((vehicles: any[]) => {
          this.vehicleInfo = vehicles;
        });

      this.firestore.collection('maintenance', ref => ref.where('userId', '==', this.userId))
        .snapshotChanges()
        .subscribe((actions) => {
          this.maintenanceHistory = actions.map(a => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id; // Get the maintenance ID for deletion
            return { id, ...data };
          });
        });


    });

  }

  onSubmit() {
    // Add the vehicle to the database
    if (this.vehicleForm.valid) {
      const formValue = this.vehicleForm.value;

      this.addVehicleToFirestore(formValue);

      this.vehicleForm.reset(); // Reset the form
    }
  }

  addVehicleToFirestore(formValue: any) {
    const vehicleRef = this.firestore.collection('vehicles').doc(formValue.registration);
    vehicleRef.get().subscribe(doc => {
      if (!doc.exists) {
        vehicleRef.set({
          userId: this.userId,
          Make: formValue.make,
          Model: formValue.model,
          Registration: formValue.registration
        });
      }
      // Add the maintenance history to the database
      this.firestore.collection('maintenance').add({
        userId: this.userId,
        vehicleReg: formValue.registration,
        date: formValue.date,
        serviceType: formValue.serviceType,
        cost: formValue.cost,
        otherInfo: formValue.otherInfo
      });
    });
  }

  // Get the maintenance history for a vehicle
  getMaintenanceHistoryForVehicle(vehicleReg: string) {
    return this.maintenanceHistory.filter(m => m.vehicleReg === vehicleReg);
  }

  // Delete a maintenance record
  deleteMaintenanceRecord(maintenanceId: string) {
    this.firestore.collection('maintenance').doc(maintenanceId).delete()
      .then(() => {
        console.log('Maintenance record deleted successfully');
      }).catch((error) => {
        console.error('Error deleting maintenance record: ', error);
      });
  }

  // Delete vehicle 
  deleteVehicle(registration: string) {
    this.firestore.collection('vehicles').doc(registration).delete()
      .then(() => {
        console.log('Vehicle deleted successfully');
      }).catch((error) => {
        console.error('Error deleting vehicle: ', error);
      });
  }

}
