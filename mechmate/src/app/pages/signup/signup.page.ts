import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup // Stores the registration form

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    // Initialize the registration form
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(""),
      ]]
    })
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    // Sign up the user
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.regForm?.valid) {
      const email = this.regForm.value.email;
      const password = this.regForm.value.password;
      const fullname = this.regForm.value.fullname;

      const userCredential = await this.authService.registerUser(email, password).catch((error) => {
        console.log(error);
        loading.dismiss();
      });

      if (userCredential) {
        const userUid = userCredential.user.uid;

        const userData = {
          fullname: fullname,
          email: email,
          isMechanic: false,
        };

        await this.firestore.collection('users').doc(userUid).set(userData);

        loading.dismiss();
        this.router.navigate(['/']);
      } else {
        console.log('Registration failed.');
      }
    }
  }

}
