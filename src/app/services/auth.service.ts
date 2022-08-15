import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User, LoginUser } from '../app-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:LoginUser;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private loadingService:LoadingService
  ) {
    this.auth.onAuthStateChanged(user => this.user=user);
  }

  async getUserId() {
    let userId:string;
    await this.auth.user.subscribe((user) => { userId = user.uid });
    return userId;
  }

  sigIn({ email, password }: User, passwordError:boolean) {
    if (!email || !password) {
      return;
    }
    this.loadingService.start();
    this.auth.signInWithEmailAndPassword(email, password).then(
      () => {
        this.router.navigate(['to-do-list'])
      },
      () => {
        throw 'Signin Error. E-Mail or Passwor is incorect!'
      }
    ).catch((error) => {
      console.error(error);
      passwordError=true;
    }).finally(() => {
      this.loadingService.end();
    });
  }

  signUp({ email, password, repeatPassword }: User) {
    if (!email || !password || password != repeatPassword) {
      return;
    }
    this.loadingService.start();
    this.auth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.router.navigate(['to-do-list']);
      },
      () => {
        throw 'SignUp Error! Pleace try agein';
      }
    ).catch((error) => {
      console.error(error);
    }).finally(() => {
      this.loadingService.end();
    });
  }

  signOut() {
    this.auth.signOut().then(()=> {this.router.navigate(['auth'])});
  }
}
