import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/app-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isClicked:boolean=false;

  signInForm:FormGroup;

  signUpForm:FormGroup;

  passwordError:boolean=false;

  isEyeOn:boolean=false;

  isUpEyeOn:boolean=false;

  isRepEyeOn:boolean=false;

  constructor(
    private authService:AuthService,
  ) { }

  ngOnInit() {
    this.createSignInForm();
    this.createSignUpForm();
  }

  createSignInForm(){
    this.signInForm=new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  createSignUpForm(){
    this.signUpForm=new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    }, this.passwordMatch)
  }

  passwordMatch(form:FormGroup){
    return form.get('password').value == form.get('repeatPassword').value ? null:{misMatch: true};
  }

  signIn(user:User){
    this.authService.sigIn(user, this.passwordError);
  }

  signUp(user:User){
    this.authService.signUp(user);
  }

  switch(){
    this.isClicked=!this.isClicked;
  }

  eyeClick(isSignUp:boolean, isRepeat?:boolean){
    if(!isSignUp){
      let password=document.getElementById('signInpassword') as HTMLElement;
      this.isEyeOn=!this.isEyeOn;
      if(this.isEyeOn){
        password.setAttribute('type', 'text');
      }else{
        password.setAttribute('type', 'password');
      }
    }else{
      if(isRepeat){
        let repPassword=document.getElementById('rep-pass') as HTMLElement;
        this.isRepEyeOn=!this.isRepEyeOn;
        if(this.isRepEyeOn){
          repPassword.setAttribute('type', 'text');
        }else{
          repPassword.setAttribute('type', 'password');
        }
      }else{
        let upPassword=document.getElementById('up-pass') as HTMLElement;
        this.isUpEyeOn=!this.isUpEyeOn;
        if(this.isUpEyeOn){
          upPassword.setAttribute('type', 'text');
        }else{
          upPassword.setAttribute('type', 'password');
        }
      }
    }
  }

}
