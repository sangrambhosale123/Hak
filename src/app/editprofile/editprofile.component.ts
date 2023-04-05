import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { signupService } from 'src/Service/Signup.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  editForm = new FormGroup({
    name : new FormControl(''),
    address: new FormControl(''),
    college:new FormControl(''),
    // email: new FormControl(''),
    profile: new FormControl(''),
    number: new FormControl('')
  })
  
 
  path:any = "";
  downloadURL:any = "";
  address:any = "";
  college:any = "";
  email:any = "";
  name:any = "";
  number:number = 0;
  profile:any = "";
  responce:any = {};
  
  constructor(private service:signupService, private storage:Storage, private dialog:MatDialog) { }

  

  ngOnInit(): void {
    let uid= localStorage.getItem('uid');
    this.service.getProfile(uid).subscribe((res:any)=>{
      console.log(res);
      
      this.editForm.setValue({
        name: res.name,
        address:res.address ,
        college: res.college,
        number: res.number,
        profile:''
      }) 
    })
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

  onSubmit(){
  let params = {
    address: this.editForm.value.address ,
    college: this.editForm.value.college ,
    name: this.editForm.value.name,
    number: this.editForm.value.number,   
    profile : this.downloadURL,
  }
  let uid = localStorage.getItem('uid')
  this.service.updateUser(params,uid).subscribe((res)=>{
    this.dialog.open(PopupComponent, {
      width: '250px'
    });
  })
  }
}
