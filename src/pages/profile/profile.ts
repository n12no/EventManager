import { Component, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";
import { LoginPage } from '../login/login';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public authProvider: AuthProvider, public profileProvider: ProfileProvider) {
  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot =>{
      this.userProfile = userProfileSnapshot.val();
      this.birthDate = userProfileSnapshot.val().birthDate;
    });
  }
  logOut(): void {
    this.authProvider.logoutUser().then(()=> {
      this.navCtrl.setRoot('LoginPage');
    });
  }
  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your first name & Last Name",
      inputs: [
        {
          name: "firstName",
          placeholder: "Your first name",
          value: this.userProfile.firstName
        },
        {
          name: "lastName",
          placeholder: "Your last name",
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateName(data.firstName,data.lastName);
          }
        }
      ]
    });
    alert.present();
  }
  updateDateOfBirth(birthDate: string): void {
    this.profileProvider.updateDateOfBirth(birthDate);
  }
  updateEmail(): void {
    const alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email'
        },
        {
          name: 'password',
          placeholder: 'Your Password', type: 'password'
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail,data.password)
              .then( () => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: '+ error.message);
              });
          }}]
    });
    alert.present();
  }
  updatePassword(): void {
    const alert: Alert = this.alertCtrl.create({
      inputs: 
      [
        { 
          name: 'newPassword',
          placeholder: 'New password',
          type: 'password' 
        },
        { 
          name: 'oldPassword',
          placeholder: 'Old password',
          type: 'password' 
        }
      ],
      buttons: 
      [
        { 
          text: 'Cancel' 
        },
        { 
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }}]
    });
    alert.present();
  }
}
