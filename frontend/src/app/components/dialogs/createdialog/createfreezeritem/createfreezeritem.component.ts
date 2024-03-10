import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-createfreezeritem',
  templateUrl: './createfreezeritem.component.html'
})
export class CreatefreezeritemComponent {

  constructor(private modalService: NgbModal) {}

  close(){
    this.modalService.dismissAll();
  }
  
  createFreezerItem(){
    this.modalService.dismissAll();
    console.log("create")
  }
}
