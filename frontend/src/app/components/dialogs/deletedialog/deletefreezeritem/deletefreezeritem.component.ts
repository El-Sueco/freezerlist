import { Component, Input, OnInit, inject, model } from '@angular/core';
import { NgbActiveModal, NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { FreezerItem } from '../../../../models/freezeritem';
import { FreezeritemserviceService } from '../../../../service/freezeritem/freezeritemservice.service';
import { Drawer } from '../../../../models/drawer';
import { DrawerserviceService } from '../../../../service/drawer/drawerservice.service';

@Component({
  selector: 'app-deletefreezeritem',
  templateUrl: './deletefreezeritem.component.html'
})
export class DeletefreezeritemComponent implements OnInit {
	
  @Input() id!: number;
  
  public freezerItem: FreezerItem = {
    id: -1,
    content: "",
    drawerId: -1,
    freezedate: ""
  };

  public drawer: Drawer = {
    id: -1,
    physicalOrder: -1
  };

  constructor(
    private freezeritemservice: FreezeritemserviceService,
    private drawerservice: DrawerserviceService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getFreezerItem(this.id);
  }

  getFreezerItem(id: number) {
    return this.freezeritemservice.getFreezerItem(this.id).subscribe({
      next: (data) => {
        this.freezerItem = data;
        this.drawerservice.getDrawer(data.drawerId).subscribe(resp => {
          this.drawer = resp;
        });
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
