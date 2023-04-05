import { Component, OnInit } from '@angular/core';
import { signupService } from 'src/Service/Signup.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service:signupService) { }

  ngOnInit(): void {
    this.service.logout();
  }

}
