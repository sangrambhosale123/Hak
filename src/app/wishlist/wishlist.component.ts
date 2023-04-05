import { Component } from '@angular/core';
import { signupService } from 'src/Service/Signup.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  projectId:any = [];
  projects:any[] = [];
  constructor(private service:signupService){}
  ngOnInit(): void {
    let uid = localStorage.getItem('uid');
    this.service.getWishlist(uid).subscribe((res:any)=>{
    for(let key in res) {
      if(res.hasOwnProperty(key)) {
          var value = res[key];
          this.projectId.push(value);
      
      }
  }
  // console.log(this.projectId);
  for (let i = 0; i < this.projectId.length; i++) {
    let element = this.projectId[i];
    // console.log(element);
    this.service.getProjectById(element).subscribe((res)=>{
      // console.log(res);
      this.projects.push(res);
    })
  }
  console.log(this.projects);
    })
}
removeWishlist(id:any){
console.log(id);
let uid = localStorage.getItem('uid');
this.service.removeProject(uid,id).subscribe();
}

}
