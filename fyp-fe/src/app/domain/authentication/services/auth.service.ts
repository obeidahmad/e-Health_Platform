import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {LoginModel} from "../models/login-model";
import firebase from "firebase/compat";
import {filter, throwError} from "rxjs";
import {UserAuth} from "../../../core/models/user-auth";
import {CoreRoutes} from "../../../core/core-routes";
import {AuthRoutes} from "../auth-routes";
import * as auth from 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;
import User = firebase.User;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _fbAuth: AngularFireAuth,
              private _router: Router) {

    this._fbAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // TODO update
        let token = "";
        user.getIdToken().then(t => token = t);
        const userAuth: UserAuth = {
          uid: user.uid,
          email: user.email || "No Mail Provided",
          isVerified: user.emailVerified,
        }
        localStorage.setItem("userAuth", JSON.stringify(userAuth))
      } else {
        localStorage.setItem("userAuth", 'null');
        localStorage.setItem("user", 'null');
        this._router.navigate([CoreRoutes.AUTH, AuthRoutes.LOGIN]);
      }
    });
  }


  public signIn(loginInfo: LoginModel) {
    return this._fbAuth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
      .then((result: UserCredential) => {
        this._fbAuth.authState
          .pipe(filter(user => !!user))
          .subscribe((user: User | null) => {
            console.log(user);
            this._router.navigate([CoreRoutes.MEDS])
          })
      }).catch((error) => {
        console.log(error.code)
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          throw new Error('User not found, signup?');
        } else if (errorCode === 'auth/wrong-password') {
          throw new Error('Wrong password');
        } else {
          throw error;
        }
      })
  }

  public signUp(signUpInfo: LoginModel) {
    return this._fbAuth
      .createUserWithEmailAndPassword(signUpInfo.email, signUpInfo.password)
      .then((result) => {
        console.log(result);
        this.verifyEmail().then();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  public verifyEmail() {
    return this._fbAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this._router.navigate([AuthRoutes.VERIFY_EMAIL]);
      });
  }

  public authWithGoogle() {
    return this.authWithExternalProvider(new auth.GoogleAuthProvider())
      .then((res: any) => {
      this._router.navigate([CoreRoutes.MEDS]);
    });
  }

  public getCurrentUser(): UserAuth {
    const user = localStorage.getItem('user') || '';
    return JSON.parse(user);
  }

  public getCurrentUserId(): string {
    return "7bc03b0b-b8b6-488a-9174-0b4de26cb3ec";
  }

  private authWithExternalProvider(provider: any) {
    return this._fbAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this._router.navigate([CoreRoutes.MEDS]);
      })
      .catch((error: any) => {

      });
  }
}
