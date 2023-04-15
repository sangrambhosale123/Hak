import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { signupService } from 'src/Service/Signup.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {

  path:any = "";
downloadURL:any = "";
uploadedBy:any = "";
working:boolean = false;

addProject = new FormGroup({
  name : new FormControl(''),
  description: new FormControl(''),
  field: new FormControl(''),
  sellCost:new FormControl(''),
  componentImage: new FormControl(''),
})

constructor(public dialogRef:MatDialogRef<EditProjectComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
    private storage:Storage, private service:signupService,private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.addProject.setValue({
      name: this.data.name,
      description: this.data.description ,
      field: this.data.field,
      sellCost: this.data.sellCost,
      componentImage:"",
       }) 
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
    let uid = localStorage.getItem('uid');
    let id = this.data.id;
    let params = {
      description: this.addProject.value.description,
      field: this.addProject.value.field,
      id: id,
      name:this.addProject.value.name,
      projectImage1: this.downloadURL,
      sellCost: this.addProject.value.sellCost,
      uploadedBy: uid
    }
    // console.log(this.data);
    
    // console.log(params);
    // console.log(id);
    
    
    this.service.updateProject(params,id).subscribe((res)=>{
      this.dialog.open(PopupComponent, {
        width: '250px'
      });
    })
  }

}
