import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FreezeritemserviceService } from '../../../../service/freezeritem/freezeritemservice.service';
import { FreezerItem } from '../../../../models/freezeritem';

@Component({
  selector: 'app-createfreezeritem',
  templateUrl: './createfreezeritem.component.html'
})
export class CreatefreezeritemComponent {

  public freezerItem: FreezerItem = {
    content: "",
    drawer: "",
    freezedate: (new Date()).toISOString().substring(0,10)
  };

  constructor(
    public freezeritemservice: FreezeritemserviceService,
    public activeModal: NgbActiveModal
  ) {}

  close(){
    this.activeModal.close(true);
  }

  
  createFreezerItem(){
    this.freezeritemservice.createFreezerItem(this.freezerItem).subscribe();
  }

  submitForm(form: any): void {
    this.createFreezerItem();
    this.close();
  }
}
