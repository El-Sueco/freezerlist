import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-createfreezeritem',
  templateUrl: './createfreezeritem.component.html'
})
export class CreatefreezeritemComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  close(){
    this.activeModal.close(true);
  }
  
  createFreezerItem(){
    this.close();
  }
}
