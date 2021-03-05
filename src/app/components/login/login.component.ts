import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService:UsersService,private router: Router) { }

  ngOnInit(): void {
  }

  
  ///login form using reactive forms
  LoginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
    ]),
    password: new FormControl('',[
      Validators.required,
    ])
  })

  user
  subscriber
  res
  errorMsg
  emailError
  passwordError
  ///on submit login form
  login(){
    
    if(this.LoginForm.status == "VALID"){
      const {username,password} = this.LoginForm.value
      this.user = {
        username,
        password,
      }
      this.subscriber = this.usersService.signInUser(this.user)
      .subscribe(
      (response)=>{
        this.res = response
        if(this.res.success){
          localStorage.setItem('token',this.res.token)
          this.LoginForm.reset()
          this.router.navigate(['profile'])
        }
        else
          this.errorMsg = this.res.message   
      },
      (err)=>{
        this.errorMsg = "server error...please try again later"
      })
    }else{
      let err = this.LoginForm.controls.username.errors;
      if(err){
        this.usernameError = true
      }
      err = this.LoginForm.controls.password.errors
      if(err){
        this.passwordError = true
      }
    }

  }

  ngOnDestroy() {
    if(this.subscriber)
      this.subscriber.unsubscribe();
  }

}
