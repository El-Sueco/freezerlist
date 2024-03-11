import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
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

  @Input() id!: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  selectedFiles?: FileList;
  currentFile?: File;
  preview = '';
  
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
      }
    });
  }

  close(){
    this.activeModal.close(true);
  }

  updateFreezerItem(){
    this.freezeritemservice.updateFreezerItem(this.id, this.freezerItem).subscribe();
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
          console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
}
