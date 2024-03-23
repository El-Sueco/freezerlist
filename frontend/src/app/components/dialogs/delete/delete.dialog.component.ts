import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FreezerItem } from '../../../models/freezeritem';
import { DrawerService } from '../../../service/drawer/drawer.service';
import { Drawer } from '../../../models/drawer';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FreezerItemService } from '../../../service/freezeritem/freezeritem.service';
import { FreezerItemImage } from '../../../models/freezeritemimage';
import { FreezerItemImageService } from '../../../service/freezeritemimage/freezeritemimage.service';

@Component({
  selector: 'app-edit.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.component.html',
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'de-DE'}, provideNativeDateAdapter()],
})

export class DeleteDialogComponent implements OnInit{
  drawer: Drawer = {
    id: -1,
    physicalOrder: -1
  };
  freezerItem: FreezerItem = {
    id: -1,
    content: "",
    freezedate: "",
    drawerId: -1
  };
  public id!: number;
  
  
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private drawerService: DrawerService,
    private freezerItemService: FreezerItemService
  ) { }

  ngOnInit(): void {
    this.id = this.data['id']
    this.getFreezerItem(this.id);
  }

  getFreezerItem(id: number) {
    return this.freezerItemService.getFreezerItem(this.id).subscribe({
      next: (data) => {
        this.freezerItem = data;
        this.drawerService.getDrawer(data.drawerId).subscribe(resp => {
          this.drawer = resp
        })
      }
    });
  }

  deleteFreezerItem(){
    this.freezerItemService.deleteFreezerItem(this.id).subscribe();
  }

  onSubmit(form: any): void {
    this.deleteFreezerItem();
    this.dialogRef.close(form);
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
