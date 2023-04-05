import { Component, OnInit } from '@angular/core';
import { sharedService } from 'src/Service/SharedService.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  status:string |undefined;
  constructor(private sharedService:sharedService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('token');
    if(user){
      this.status = 'active';
    }
   
   this.sharedService.isActive.subscribe((res)=>{
    this.status = res;
    //console.log(res);
   })
  }
   
}
