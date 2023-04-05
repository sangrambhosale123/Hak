import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { signupService } from 'src/Service/Signup.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  success : boolean = false; 
  constructor(private route : Router , private authService:signupService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    //console.log(form.value.email);
    this.authService.forgotPassword(form.value.email).subscribe((res)=>{
      console.log(res);
      this.success = true;
    });
  }
}
