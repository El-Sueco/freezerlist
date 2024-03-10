import { Component, OnInit } from '@angular/core';
import { FreezeritemserviceService } from '../../service/freezeritem/freezeritemservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-freezeritemlist',
  templateUrl: './freezeritemlist.component.html',
  styleUrl: './freezeritemlist.component.css'
})
export class FreezeritemlistComponent {

  freezeritems: any = [];
  constructor(private service: FreezeritemserviceService) { }

  ngOnInit(): void {
    this.getFreezerItems();
    console.log(this.freezeritems)
  }

  getFreezerItems() {
    this.service
        .getFreezerItems()
        .subscribe((response: any) => {
          this.freezeritems = response;
        });
  }
}
