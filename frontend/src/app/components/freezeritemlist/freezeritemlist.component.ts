import { AfterContentChecked, AfterContentInit, AfterRenderPhase, AfterRenderRef, AfterViewChecked, AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { FreezeritemserviceService } from '../../service/freezeritem/freezeritemservice.service';
import { Subject } from 'rxjs';
import { DeletefreezeritemComponent } from '../dialogs/deletedialog/deletefreezeritem/deletefreezeritem.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetorupdatefreezeritemComponent } from '../dialogs/getorupdatedialog/getorupdatefreezeritem/getorupdatefreezeritem.component';
import { CreatefreezeritemComponent } from '../dialogs/createdialog/createfreezeritem/createfreezeritem.component';
import { FreezerItem } from '../../models/freezeritem';
import { DrawerserviceService } from '../../service/drawer/drawerservice.service';

@Component({
  selector: 'app-freezeritemlist',
  templateUrl: './freezeritemlist.component.html'
})
export class FreezeritemlistComponent implements OnInit, AfterContentChecked  {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public drawers: any;

  constructor(
    private freezeritemservice: FreezeritemserviceService,
    private drawerservice: DrawerserviceService,
    private renderer: Renderer2,
    private modalService: NgbModal
  ) { }
 
  ngOnInit(): void {
    this.loadDatatable();
    this.drawerservice.getDrawers().subscribe(resp => {
      this.drawers = resp;
    });
  }

  ngAfterContentChecked(): void {
    console.log($(".drawerId"))
    $('.addButton').off('click'); // FIXME this is indeed a workaround
    $('.addButton').on("click", (event) => {
      this.addButtonClick();
    })
  }

  loadDatatable() {
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
        title: 'Drawer',
        render: function(data, type, full, meta) {
          return '<span class="drawerId">' + full.drawerId + '</span>'
        }
      }, {
        title: '<button type="button" class="addButton btn btn-success"><i class="bi bi-plus"></i></button>',
        render: function (data, type, full, meta) { return '<button type="button" class="getOrUpdateButton btn btn-primary"' +
          'data-id="' + full.id + '"><i class="bi bi-pen"></i></button> <button type="button" class="deleteButton btn btn-danger" data-id="' + full.id + '" data-operation="delete"><i class="bi bi-trash"></i></button>'}
      }],
      columnDefs: [
        {targets: 2, width: "90px", orderable: false}
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('.getOrUpdateButton', row).off('click');
        $('.getOrUpdateButton', row).on('click', (event) => {
          this.getOrUpdateButtonClick(event);
        });
        $('.deleteButton', row).off('click');
        $('.deleteButton', row).on('click', (event) => {
          this.deleteButtonClick(event);
        });
      }
    };
  }

  reloadDatatable() {
    $('#freezerItemTable').DataTable().ajax.reload();
  }

  addButtonClick() {
    let modalRef: any;
    modalRef = this.modalService.open(CreatefreezeritemComponent);
    modalRef.result.then((result: any) => {
      this.reloadDatatable();
    });
  }

  getOrUpdateButtonClick(event: any) {
    let modalRef: any = this.modalService.open(GetorupdatefreezeritemComponent);
    modalRef.componentInstance.id = event.currentTarget.dataset["id"];
    modalRef.result.then((result: any) => {
      this.reloadDatatable();
    });
  }

  deleteButtonClick(event: any) {
    let modalRef: any = this.modalService.open(DeletefreezeritemComponent);
    modalRef.componentInstance.id = event.currentTarget.dataset["id"];
    modalRef.result.then((result: any) => {
      this.reloadDatatable();
    });
  }
}
