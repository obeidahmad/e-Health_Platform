import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {LoginModel} from "../models/login-model";
import firebase from "firebase/compat";
import {UserAuth, UserInformation} from "../../../core/models/user-auth";
import {CoreRoutes} from "../../../core/core-routes";
import {AuthRoutes} from "../auth-routes";
import * as auth from 'firebase/auth';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import UserCredential = firebase.auth.UserCredential;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authBackendUrl = environment.auth

  constructor(private _fbAuth: AngularFireAuth,
              private _http: HttpClient,
              private _router: Router) {

    this._fbAuth.authState.subscribe((user) => {
      if(user) {

      }
      if (!user) {
        localStorage.setItem("userAuth", 'null');
        localStorage.setItem("user", 'null');
        this._router.navigate([CoreRoutes.AUTH, AuthRoutes.LOGIN]);
      }
    });
  }

  forgotPassword(emailToReset: string) {
    return this._fbAuth
      .sendPasswordResetEmail(emailToReset)
      .then(() => {
        return "Email sent, check your inbox"
      }).catch(error=>{
        console.log(error.code);
        const code = error.code;
        if (code == 'auth/user-not-found') throw Error("No such user");
        throw Error(error);
      })
  }

  public signIn(loginInfo: LoginModel) {
    return this._fbAuth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
      .then((result: UserCredential) => {
        result.user?.getIdToken().then(token => {
          this._http.get(this.getUserUrl(token)).subscribe({
            next: (userInfo: any) => {
              localStorage.setItem("token", token);
              localStorage.setItem('user', JSON.stringify(userInfo))
              if (!userInfo.role) throw Error("No assigned role")

            }
          })
        })
      }).catch((error) => {
        console.log(error.code)
        const errorCode = error.code;
        if (!errorCode) throw error
        if (errorCode === 'auth/user-not-found') {
          throw new Error('This user does not have an account. Sign up?');
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
  }

  public authWithGoogle() {
    return this.authWithExternalProvider(new auth.GoogleAuthProvider())
      .then((res) => {
        console.log(res)
        // this._http.get(this.getUserUrl(token)).subscribe({
        //   next: (userInfo) => {
        //     console.log(userInfo)
        //     localStorage.setItem('user', JSON.stringify(userInfo))
        //     console.log("gonna navigate")
        //   }
        // })
        // this._router.navigate([CoreRoutes.MEDS]);
      });
  }

  public getCurrentUser(): UserInformation | undefined  {
    const user = localStorage.getItem('user');
    return (user)? JSON.parse(user) : undefined;
  }

  public getCurrentUserId(): string {
    const user = this.getCurrentUser();
    if (!user) return '';
    else {
      return  user.user_id;
    }
  }

  private getUserUrl = (token: string) => `${this.authBackendUrl}/validate_token?token=${token}`

  private authWithExternalProvider(provider: any) {
    return this._fbAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        console.log(result.credential().access_token)
        // this._router.navigate([CoreRoutes.MEDS]);
      })
      .catch((error: any) => {

      });
  }
}
