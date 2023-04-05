import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { signupService } from 'src/Service/Signup.service';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { sharedService } from 'src/Service/SharedService.service';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase } from 'firebase/database';

interface SignupForm {
  name: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  app = initializeApp(environment.firebase);
  db = getDatabase(this.app);
  form = {
    name : '',
    address : '',
    email : '',
    college : '',
    number : '',
    password : ''
  };
  time = 0;
  timer: any;
  myId: any = '';
  status: any = false;
  path: any = {};
  downloadURL: any = '';
  constructor(
    private storage: Storage,
    private signupService: signupService,
    private router: Router,
    private sharedService: sharedService,
  ) {}
  startTimer() {
    const loader = document.getElementById('loadingSpinner') as HTMLElement;
    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";
    }, 3000);
  }
  ngOnInit(): void {}
  onfileSelected(event : any){
    this.startTimer();
    this.path = event.target.files[0];
    const storageData = ref(this.storage,'Profiles/'+this.path.name);
    const uploadTask = uploadBytesResumable(storageData,this.path);
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      console.log('upload is ' + progress + '% done');
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("before:-",downloadURL)
        this.downloadURL = downloadURL;
      });
    })
   
  }


  intergerRegex = /^\d+$/;
  mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  onSubmit() {
     let params = {
        name: this.form.name,
        address: this.form.address,
        number:"+91"+ this.form.number,
        college: this.form.college,
        email: this.form.email,
        profile : this.downloadURL,
      };

      this.signupService.signup(params.email, this.form.password).subscribe((res)=>{
        console.log(res);
        console.log(res.localId);
        console.log("Done");
        this.signupService.storeInFirebase('users/', params,res.localId);
      },(error) => {
        console.log(error);
        
      });
  }
}
