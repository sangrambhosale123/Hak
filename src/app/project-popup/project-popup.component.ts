import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { signupService } from 'src/Service/Signup.service';

@Component({
  selector: 'app-project-popup',
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.css']
})
export class ProjectPopupComponent {
  project:any|undefined;
  constructor(private service:signupService,@Inject(MAT_DIALOG_DATA) public data:any,private route:Router,private matdiaRef:MatDialog) { }
  ngOnInit(): void {
  this.project=this.data
  }
  buy(){
    this.matdiaRef.closeAll;
    this.route.navigateByUrl('contactUs');

  }
}
