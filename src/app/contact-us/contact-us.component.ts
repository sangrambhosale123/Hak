import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { signupService } from 'src/Service/Signup.service';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
 
  uploadedBy:any = "";
  contactUs = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  })
  constructor(private service: signupService) { }

  ngOnInit(): void {
    let uid= localStorage.getItem('uid');
    this.service.getProfile(uid).subscribe((res:any)=>{
    })
  }
  onSubmit(){
    const myId = uuid();
    this.uploadedBy = localStorage.getItem('uid');
    let params = {
      id: myId,
      title: this.contactUs.value.title,
      description: this.contactUs.value.description  ,
      uploadedBy: this.uploadedBy
      }
      console.log(params);
      this.service.storeInFirebase1('contactUs/', params,myId);
  }
}
