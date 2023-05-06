import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import {  FormControl, NgForm } from '@angular/forms';
import { signupService } from 'src/Service/Signup.service';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  path : any = {};
  path1 : any = {};
  downloadURL : any = "";
  downloadURL1 : any = "";
  downloadURL2 : any = "";
  downloadURL3 : any = "";
  digit:any = "1234567890";
  series:any|undefined;
  id : any|undefined;
  blackbook : boolean = false;
  ppt : boolean = false;
  synopsis : boolean = false;
  working : boolean = false;
  uploadedBy : any = "";
  constructor(private signupService:signupService, private storage:Storage) { }

  ngOnInit(): void {
    
  }
  onImageSelected(event:any){
    this.path = event.target.files[0];
    const storageData = ref(this.storage,'Project Images/'+this.path.name);
    const uploadTask = uploadBytesResumable(storageData,this.path);
    uploadTask.on('state_changed',
    /*(snapshot)=>{ 
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      console.log('upload is' + progress + '% done');
    },*/
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("before:-",downloadURL)
        this.downloadURL = downloadURL;
      });
    })
  }
  onImageSelected1(event:any){
    this.path = event.target.files[0];
    const storageData = ref(this.storage,'Project Images/'+this.path.name);
    const uploadTask = uploadBytesResumable(storageData,this.path);
    uploadTask.on('state_changed',
    /*(snapshot)=>{ 
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      console.log('upload is' + progress + '% done');
    },*/
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("before:-",downloadURL)
        this.downloadURL1 = downloadURL;
      });
    })
  }

  
  onSubmit(form:NgForm){
    const myId = uuid();
    if(form.value.blackbook == "true"){
       this.blackbook = true;
    }
    if(form.value.ppt == "true"){
      this.ppt = true;
    }
    if(form.value.synopsis == "true"){
      this.synopsis = true;
    }
    if(form.value.working == "true"){
      this.working = true;
    }
    this.id = new Date().getTime().toString();
    this.uploadedBy = localStorage.getItem('uid');
    let params = {
      id : myId,
      name : form.value.p_name, 
      description : form.value.desc,
      field : form.value.field,
      sellCost : form.value.sell,
      uploadedBy : this.uploadedBy,
      projectImage : this.downloadURL,  
      projectImage1 : this.downloadURL1,
      projectImage2 : this.downloadURL2,
      projectImage3 : this.downloadURL3,
    }
    this.signupService.storeInFirebase1('projects/', params,myId);
  }

}
