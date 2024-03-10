import { Component, OnDestroy, OnInit } from '@angular/core';
import { FreezeritemserviceService } from '../../service/freezeritem/freezeritemservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-freezeritemlist',
  templateUrl: './freezeritemlist.component.html',
  styleUrl: './freezeritemlist.component.css'
})
export class FreezeritemlistComponent implements OnInit, OnDestroy {

  freezeritems: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: FreezeritemserviceService) { }

  ngOnInit(): void {
    this.getFreezerItems();
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.service
        .getFreezerItems().subscribe(resp => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp
            });
          });
      },
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Content',
        data: 'content'
      }, {
        title: 'Freezedate',
        data: 'freezedate'
      }]
    };
  }

  getFreezerItems() {
    this.service
        .getFreezerItems()
        .subscribe((response: any) => {
          this.freezeritems = response;
          //this.dtTrigger.next();
        });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
