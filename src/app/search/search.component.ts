import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  enteredSearchValue: string = '';
  @Output()
  searchTextChange: EventEmitter <string> = new EventEmitter <string>();

  onSearchTextChange(){
    
    this.searchTextChange.emit(this.enteredSearchValue.toLowerCase());
  }
}
