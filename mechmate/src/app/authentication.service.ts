import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public ngFireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  // Register the user
  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  // Login the user
  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Reset the user's password
  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  // Sign out the user
  async signOut() {
    return await this.ngFireAuth.signOut()
  }

  // Get the user's ID
  async getUserId(): Promise<string | null> {
    return new Promise((resolve) => {
      this.ngFireAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });
  }

  // Get the user's profile
  async getProfile() {
    return await this.ngFireAuth.currentUser
  }

  // Update the user's profile
  async getCurrentUser(): Promise<User | null> {
    return this.ngFireAuth.currentUser;
  }

  // Check if the user is logged in
  async isUserLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.ngFireAuth.onAuthStateChanged((user) => {
        resolve(user !== null);
      });
    });
  }

}
