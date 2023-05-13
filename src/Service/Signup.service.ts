import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { sharedService } from './SharedService.service';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/popup/popup.component';


@Injectable()
export class signupService {
  projectData: any = [];
  app = initializeApp(environment.firebase);
  db = getDatabase(this.app);
  userName: String | undefined;
  imgaeDetails: any | undefined;
  uid: any = '';
  constructor(
    private http: HttpClient,
    private fireauth: AngularFireAuth,
    private router: Router,
    private sharedService: sharedService,
    public dialog: MatDialog,
  ) {}

  signup(email: string, password: string) {
    let body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`,
      body,
      { headers: headers }
    );
  }

  login(email: string, password: string) {
    let body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`,
      body,
      { headers: headers }
    );
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      this.sharedService.isActive.emit('');
      this.router.navigateByUrl('Login');
    });
  }
  forgotPassword(data: any) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key${environment.firebase.apiKey}`,
      {
        requestType: 'PASSWORD_RESET',
        email: data,
      }
    );
  }

  storeInFirebase(databaseName: any, params: any, databaseId: any) {
    set(ref(this.db, databaseName + databaseId), params)
      .then(() => {
        this.dialog.open(PopupComponent, {
          width: '250px',
        });
      })
      .catch((error) => {console.log(error);
      });
      this.router.navigateByUrl('Login');
  }
  storeInFirebase1(databaseName: any, params: any, databaseId: any) {
    set(ref(this.db, databaseName + databaseId), params)
      .then(() => {
        this.dialog.open(PopupComponent, {
          width: '250px',
        });
      })
      .catch((error) => {console.log(error);
      });
      this.router.navigateByUrl('');
  }
  // readProjectData() {
  //   this.http.get<projectDetails>('https://hak-database-default-rtdb.firebaseio.com/projects.json').
  //   pipe(map(resData=>{
  //      const project = [];
  //     for(const key in resData){
  //        project.push({uid:key, ...resData[key as keyof typeof resData]})
  //     }
  //      console.log(project);
  //     this.projectData = project;
      
  //      return project
  //   }))
    //.
    // subscribe()
    // this.http
    //   .get('https://hak-database-default-rtdb.firebaseio.com/projects.json')
    //   .subscribe((res) => {
    //     this.projectData = res;
    //   });
  // }
  updateUser(userData:any,id:any){
    return this.http.put('https://hak-database-default-rtdb.firebaseio.com/users/'+id+'.json',userData)
}

updateProject(projectData:any,id:any){
  return this.http.put('https://hak-database-default-rtdb.firebaseio.com/projects/'+id+'.json',projectData)
}

deleteProject(id:any){
  return this.http.delete('https://hak-database-default-rtdb.firebaseio.com/projects/'+id+'.json')
}

  getProjectData() {
    return this.http.get('https://hak-database-default-rtdb.firebaseio.com/projects.json');
  }

  getProjectById(id:any){
    return this.http.get('https://hak-database-default-rtdb.firebaseio.com/projects/'+id+'.json');
  }

  getProfile(uid:any) {
    return this.http.get('https://hak-database-default-rtdb.firebaseio.com/users/'+uid+'.json');
  }

  getComponentData() {
    return this.http.get('https://hak-database-default-rtdb.firebaseio.com/components.json');
  }
  removeProject(uid:any,id:any){
    return this.http.delete('https://hak-database-default-rtdb.firebaseio.com/wishlist/'+uid+'/'+'0.json')
  }
  updateComponent(userData:any,id:any){
    return this.http.put('https://hak-database-default-rtdb.firebaseio.com/components/'+id+'.json',userData)
}

getWishlist(id:any){
  return this.http.get('https://hak-database-default-rtdb.firebaseio.com/wishlist/'+id+'.json');
}
addWishlist(id:any,data:any){
  set(ref(this.db,'wishlist/'+ id), data)
      .then(() => {
        this.dialog.open(PopupComponent, {
          width: '250px',
        });
      })
      .catch((error) => {console.log(error);
      });
  // return this.http.post('https://hak-database-default-rtdb.firebaseio.com/wishlist/'+id+'.json',data)
}
}

