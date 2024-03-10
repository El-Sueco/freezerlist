import { Component, inject, model } from '@angular/core';
import { NgbActiveModal, NgbModal, } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deletefreezeritem',
  templateUrl: './deletefreezeritem.component.html'
})
export class DeletefreezeritemComponent {
	
  constructor(private modalService: NgbModal) {}

  close(){
    this.modalService.dismissAll();
  }

  deleteFreezerItem(){
    this.modalService.dismissAll();
    console.log("delete")
  }
}
