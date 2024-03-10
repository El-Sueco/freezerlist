import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { FreezeritemserviceService } from '../../service/freezeritem/freezeritemservice.service';
import { Subject } from 'rxjs';
import { DeletefreezeritemComponent } from '../dialogs/deletedialog/deletefreezeritem/deletefreezeritem.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetorupdatefreezeritemComponent } from '../dialogs/getorupdatedialog/getorupdatefreezeritem/getorupdatefreezeritem.component';
import { CreatefreezeritemComponent } from '../dialogs/createdialog/createfreezeritem/createfreezeritem.component';

@Component({
  selector: 'app-freezeritemlist',
  templateUrl: './freezeritemlist.component.html'
})
export class FreezeritemlistComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private freezeritemservice: FreezeritemserviceService,
    private renderer: Renderer2,
    private modalService: NgbModal
  ) { }
 
  ngOnInit(): void {
    this.loadDatatables();
  }

  loadDatatables() {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.freezeritemservice
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
        const id: number = event.target.getAttribute("data-id");
        let modalRef: any;
        switch (event.target.getAttribute("data-operation")){
          case "create":
            this.modalService.open(CreatefreezeritemComponent);
            break;
          case "getOrUpdate":
            modalRef = this.modalService.open(GetorupdatefreezeritemComponent);
            modalRef.componentInstance.id = id;
            break;
          case "delete":
            modalRef = this.modalService.open(DeletefreezeritemComponent);
            modalRef.componentInstance.id = id;
            break;
          default:
            throw new Error("operation not supported!")
        }
      }
    });
  }

}
