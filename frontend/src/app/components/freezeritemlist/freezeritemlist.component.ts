import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { FreezeritemserviceService } from '../../service/freezeritem/freezeritemservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-freezeritemlist',
  templateUrl: './freezeritemlist.component.html',
  styleUrl: './freezeritemlist.component.css'
})
export class FreezeritemlistComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: FreezeritemserviceService, private renderer: Renderer2) { }
 
  ngOnInit(): void {
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
        title: 'Content',
        data: 'content'
      }, {
        title: 'Freezedate',
        data: 'freezedate',
      }, {
        title: '<button type="button" class="btn btn-success" data-id="-1" data-operation="create">+</button>',
        render: function (data, type, full, meta) { return '<button type="button" class="btn btn-primary"' +
          'data-id="' + full.id + '" data-operation="getOrUpdate">/</button> <button type="button" class="btn btn-danger" data-id="' + full.id + '" data-operation="delete">#</button>'}
      }],
      columnDefs: [
        {targets: 2, orderable: false}
      ]
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("data-id")) {
        switch (event.target.getAttribute("data-operation")){
          case "create":
            break;
          case "getOrUpdate":
            break;
          case "delete":
            break;
          default:
            throw new Error("operation not supported!")
        }
      }
    });
  }

}
