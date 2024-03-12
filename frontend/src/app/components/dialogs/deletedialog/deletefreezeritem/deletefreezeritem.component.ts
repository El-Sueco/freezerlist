import { Component, Input, OnInit, inject, model } from '@angular/core';
import { NgbActiveModal, NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { FreezerItem } from '../../../../models/freezeritem';
import { FreezeritemserviceService } from '../../../../service/freezeritem/freezeritemservice.service';
import { Drawer } from '../../../../models/drawer';

@Component({
  selector: 'app-deletefreezeritem',
  templateUrl: './deletefreezeritem.component.html'
})
export class DeletefreezeritemComponent implements OnInit {
	
  @Input() id!: number;
  
  public freezerItem: FreezerItem = {
    id: -1,
    content: "",
    drawer: "",
    freezedate: ""
  };

  constructor(
    private freezeritemservice: FreezeritemserviceService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getFreezerItem(this.id);
  }

  getFreezerItem(id: number) {
    return this.freezeritemservice.getFreezerItem(this.id).subscribe({
      next: (data) => {
        this.freezerItem = data;
        this.freezerItem.drawer = Drawer[data.drawer as keyof typeof Drawer]
      }
    });
  }

  deleteFreezerItem(){
    this.freezeritemservice.deleteFreezerItem(this.id).subscribe();
    this.close();
  }

  close(){
    this.activeModal.close(true);
  }
}
