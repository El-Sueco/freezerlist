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
  templateUrl: '../../dialogs/edit/edit.dialog.component.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.component.scss'],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'de-DE'}, provideNativeDateAdapter()],
})

export class EditDialogComponent implements OnInit{
  
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';
  drawers?: Drawer[] = [];
  freezerItem: FreezerItem = {
    id: -1,
    content: "",
    freezedate: "",
    drawerId: -1
  };
  freezerItemImage: FreezerItemImage = {
    id: -1,
    image: ""
  };
  public id!: number;
  
  
  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private drawerService: DrawerService,
    private freezerItemService: FreezerItemService,
    private freezerItemImageService: FreezerItemImageService,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
    this.drawerService.getDrawers().subscribe({
      next: data => {
        this.drawers = data;
      }
    });
    this.id = this.data['id']
    this.getFreezerItem(this.id);
    this.getFreezerItemImage(this.id)
    
  }

  getFreezerItem(id: number) {
    return this.freezerItemService.getFreezerItem(this.id).subscribe({
      next: (data) => {
        this.freezerItem = data;
      }
    });
  }

  getFreezerItemImage(id: number) {
    return this.freezerItemImageService.getImage(this.id).subscribe({
      next: (data) => {
        this.freezerItemImage = data;
        this.preview = this.freezerItemImage.image;
      }
    })
  }

  editFreezerItem(){
    this.freezerItemService.updateFreezerItem(this.id, this.freezerItem).subscribe(resp => {
      this.freezerItem = resp;
      const freezerItemImage: FreezerItemImage = {
        id: resp.id,
        image: this.preview
      }
      this.freezerItemImageService.createOrUpdateImage(resp.id, freezerItemImage).subscribe();
    });
  }

  onSubmit(form: any): void {
    this.editFreezerItem();
    this.dialogRef.close(form);
  }
  
  close(): void {
    this.dialogRef.close();
  }

  selectFile(event: any): void {
    this.preview = '';
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          if(file.size > 100000) {
            this.imageCompress
            .compressFile(e.target.result, 0, 35, 35)
            .then(compressedImage => {
                this.preview = compressedImage;
            });
          } else {
            this.preview = e.target.result
          }
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
}
