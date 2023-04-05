import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  constructor(private route: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}
  closeWindow() {
    console.log('Working');
    this.dialog.closeAll();
  }
}
