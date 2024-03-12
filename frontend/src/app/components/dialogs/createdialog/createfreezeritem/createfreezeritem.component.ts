import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FreezeritemserviceService } from '../../../../service/freezeritem/freezeritemservice.service';
import { FreezerItem } from '../../../../models/freezeritem';
import { NgxImageCompressService } from 'ngx-image-compress';
import { FreezerItemImage } from '../../../../models/freezeritemimage';
import { FreezeritemimageserviceService } from '../../../../service/freezeritemimage/freezeritemimageservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-createfreezeritem',
  templateUrl: './createfreezeritem.component.html'
})
export class CreatefreezeritemComponent {
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';

  public freezerItem: FreezerItem = {
    id: -1,
    content: "",
    drawer: "",
    freezedate: (new Date()).toISOString().substring(0,10)
  };

  constructor(
    public freezeritemservice: FreezeritemserviceService,
    public freezeritemimageservice: FreezeritemimageserviceService,
    private imageCompress: NgxImageCompressService,
    public activeModal: NgbActiveModal
  ) {}

  close(){
    this.activeModal.close(true);
  }

  
  async createFreezerItem(){
    this.freezeritemservice.createFreezerItem(this.freezerItem).subscribe(resp => {
      this.freezerItem = resp;
      const freezerItemImage: FreezerItemImage = {
        id: resp.id,
        image: this.preview
      }
      this.freezeritemimageservice.createOrUpdateImage(resp.id, freezerItemImage).subscribe();
    });
  }

  submitForm(form: any): void {
    this.createFreezerItem();
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
