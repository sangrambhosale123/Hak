import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { signupService } from 'src/Service/Signup.service';
import { ComponentsPopupComponent } from '../components-popup/components-popup.component';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
})
export class ComponentsComponent implements OnInit {
  searchText: string = '';
  components: any[] = [];
  editComponents: any = {};

  constructor(private matdiaRef: MatDialog, private service: signupService) {}

  ngOnInit(): void {
    this.service.getComponentData().subscribe((res: any) => {
      let ids = [];
      for (let r in res) {
        ids.push(r);
      }
      for (let key in res) {
        if (res.hasOwnProperty(key)) {
          var value = res[key];
          this.components.push(value);
        }
      }
      console.log(this.components);
    });
  }
  openDialog() {
    this.matdiaRef.open(ComponentsPopupComponent,{
      width: '800px'
    });
  }

     editComponent(id:any){
   for( let key in this.components){
     var value = this.components[key];
     if(value.id == id){
    this.editComponents = value;
     }
   }
   this.matdiaRef.open(ComponentsPopupComponent,{
     width: '800px',
     data: this.editComponents
   });
  }
  myComponents(component:any){

  }
  onSearchtextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }
}
