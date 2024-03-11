import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FreezeritemserviceService } from '../../../../service/freezeritem/freezeritemservice.service';
import { FreezerItem } from '../../../../models/freezeritem';

@Component({
  selector: 'app-createfreezeritem',
  templateUrl: './createfreezeritem.component.html'
})
export class CreatefreezeritemComponent {
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';

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
          console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
}
