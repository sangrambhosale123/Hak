import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { signupService } from 'src/Service/Signup.service';
import { AddprojectComponent } from '../addproject/addproject.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ProjectPopupComponent } from '../project-popup/project-popup.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  id: any = localStorage.getItem('uid');
  searchText: string = '';
  wishId: String[] = [];
  wishlistId: any[] = [];
  addToWishlist_1: any = {};
  editProject1: any = {};
  projectStatus: any = '';
  myProjects1: any[] = [];
  projects: any[] = [];

  constructor(
    public service: signupService,
    private matdiaRef: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('uid');
    this.service.getProjectData().subscribe((res: any) => {
      let ids = [];
      for (let r in res) {
        ids.push(r);
      }
      for (let key in res) {
        if (res.hasOwnProperty(key)) {
          var value = res[key];
          this.projects.push(value);
        }
      }
      console.log(this.projects);
    });
  }

  openDialog() {
    this.matdiaRef.open(AddprojectComponent);
  }
  myProjects() {
    this.projectStatus = 'active';
    let uid = localStorage.getItem('uid');
    this.service.getProjectData().subscribe((res: any) => {
      for (let key in res) {
        if (res.hasOwnProperty(key)) {
          var value = res[key];
          if (value.uploadedBy == uid) {
            this.myProjects1.push(value);
          }
        }
      }
    });
  }
  back() {
    this.projectStatus = '';
    this.router.navigateByUrl('../');
  }

  editProject(id: any) {
    for (let key in this.projects) {
      var value = this.projects[key];
      if (value.id == id) {
        this.editProject1 = value;
      }
    }
    console.log(this.editProject1);

    this.matdiaRef.open(EditProjectComponent, {
      width: '500px',
      data: this.editProject1,
    });
  }
  addToWishlist(id: any) {
    let uid = localStorage.getItem('uid');
    for (let key in this.projects) {
      var value = this.projects[key];
      if (value.id == id) {
        this.addToWishlist_1 = value;
        console.log(this.addToWishlist_1);
        console.log(this.addToWishlist_1.id);
        this.service.getWishlist(uid).subscribe((res: any) => {
          this.wishlistId = res;
        });
        this.wishId.push(id);
        this.service.addWishlist(uid, this.wishId);
        console.log(this.wishId);
      }
    }

    let myId = localStorage.getItem('uid');
  }
  myComponents(project: any) {
    
    console.log(this.id);
    if (this.id !== null) {
      console.log(project);
      this.matdiaRef.open(ProjectPopupComponent, {
        width: '1000px',
        height: '1000px',
        data: project,
      });
    } else {
      alert('Please Login 1st');
      this.router.navigateByUrl('Login');
    }
  }

  onSearchtextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }
}
