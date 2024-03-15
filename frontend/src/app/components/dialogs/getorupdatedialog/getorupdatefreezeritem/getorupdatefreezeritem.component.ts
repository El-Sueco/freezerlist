import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FreezerItem } from '../../../../models/freezeritem';
import { FreezeritemserviceService } from '../../../../service/freezeritem/freezeritemservice.service';
import { NumberSymbol } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FreezeritemimageserviceService } from '../../../../service/freezeritemimage/freezeritemimageservice.service';
import { data } from 'jquery';
import { FreezerItemImage } from '../../../../models/freezeritemimage';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DrawerserviceService } from '../../../../service/drawer/drawerservice.service';

@Component({
  selector: 'app-getorupdatefreezeritem',
  templateUrl: './getorupdatefreezeritem.component.html'
})
export class GetorupdatefreezeritemComponent implements OnInit {

  @Input() id!: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';
  
  public freezerItem: FreezerItem = {
    id: -1,
    content: "",
    drawerId: -1,
    freezedate: ""
  };

  public freezerItemImage: FreezerItemImage = {
    id: -1,
    image: ""
  };
  
  public drawers: any;

  constructor(
    private freezeritemservice: FreezeritemserviceService,
    private freezeritemimageservice: FreezeritemimageserviceService,
    public drawerservice: DrawerserviceService,
    private imageCompress: NgxImageCompressService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getFreezerItem(this.id);
    this.getFreezerItemImage(this.id)
    this.drawerservice.getDrawers().subscribe(resp => {
      this.drawers = resp
    })
  }

  getFreezerItem(id: number) {
    return this.freezeritemservice.getFreezerItem(this.id).subscribe({
      next: (data) => {
        this.freezerItem = data;
      }
    });
  }

  getFreezerItemImage(id: number) {
    return this.freezeritemimageservice.getImage(this.id).subscribe({
      next: (data) => {
        this.freezerItemImage = data;
        this.preview = this.freezerItemImage.image;
      }
    })
  }

  close(){
    this.activeModal.close(true);
  }

  updateFreezerItem(){
    this.freezeritemservice.updateFreezerItem(this.id, this.freezerItem).subscribe(resp => {
      this.freezerItem = resp;
      if(this.preview != this.freezerItemImage.image) {
        const freezerItemImage: FreezerItemImage = {
          id: this.id,
          image: this.preview
        }
        this.freezeritemimageservice.createOrUpdateImage(this.id, freezerItemImage).subscribe();  
      }
    });
  }

  submitForm(form: any): void {
    this.updateFreezerItem();
    this.close();
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
