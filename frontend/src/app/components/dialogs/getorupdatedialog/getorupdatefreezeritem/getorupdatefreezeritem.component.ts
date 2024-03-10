import { Component, Input, OnInit, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FreezerItem } from '../../../../models/freezeritem';
import { FreezeritemserviceService } from '../../../../service/freezeritem/freezeritemservice.service';
import { NumberSymbol } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-getorupdatefreezeritem',
  templateUrl: './getorupdatefreezeritem.component.html'
})
export class GetorupdatefreezeritemComponent implements OnInit {
	activeModal = inject(NgbActiveModal);

  @Input() id!: number;
  
  public freezerItem: FreezerItem = {
    id: -1,
    content: "",
    drawer: "",
    freezedate: ""
  };

  constructor(
    private modalService: NgbModal,
    private freezeritemservice: FreezeritemserviceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getFreezerItem(this.id);
  }

  getFreezerItem(id: number) {
    return this.freezeritemservice.getFreezerItem(this.id).subscribe({
      next: (data) => {
        this.freezerItem = data;
      }
    });
  }

  close(){
    this.modalService.dismissAll();
  }

  updateFreezerItem(){
    this.freezeritemservice.updateFreezerItem(this.id, this.freezerItem).subscribe();
    this.modalService.dismissAll();
  }

  submitForm(form: any): void {
    this.updateFreezerItem();
  }
}
