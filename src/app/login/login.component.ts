import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { sharedService } from 'src/Service/SharedService.service';
import { signupService } from 'src/Service/Signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = {
    email: '',
    password: '',
  };
  mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  errorStatus: boolean = false;
  errorMessage: any = '';
  constructor(
    private router: Router,
    private signUpService: signupService,
    private shareService: sharedService
  ) {}

  ngOnInit(): void {
    this.errorStatus = false;
  }
  onSubmit(form: NgForm) {
    this.signUpService.login(form.value.email, form.value.password).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('uid', `${res.localId}`);
        localStorage.setItem('token', 'true');
        this.shareService.isActive.emit('active');
        this.router.navigateByUrl('');
      },
      (error) => {
        this.errorStatus = true;
        this.errorMessage = error.error.error.message;
        console.log(
          'An error occurred while logging in:',
          error.error.error.message
        );
      }
    );
  }
}
