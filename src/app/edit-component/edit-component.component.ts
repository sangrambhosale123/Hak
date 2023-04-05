import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { signupService } from 'src/Service/Signup.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {
path:any = "";
downloadURL:any = "";
uploadedBy:any = "";
working:boolean = false;

addComponent = new FormGroup({
  name : new FormControl(''),
  description: new FormControl(''),
  cost:new FormControl(''),
  componentImage: new FormControl(''),
  working: new FormControl(''),
})


  constructor(public dialogRef:MatDialogRef<EditComponentComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
    private storage:Storage, private service:signupService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  onImageSelected(event:any){
    this.path = event.target.files[0];
    const storageData = ref(this.storage,'Component Images/'+this.path.name);
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
    
  }
}
