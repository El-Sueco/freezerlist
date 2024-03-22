import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DrawerService } from '../../service/drawer/drawer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FreezerItemDataSource } from '../../service/datasource/freezeritem/freezeritemdatasource.service';
import { FreezerItemService } from '../../service/freezeritem/freezeritem.service';
import { Drawer } from '../../models/drawer';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateDialogComponent } from '../dialogs/create/create.dialog.component';
import { FreezerItem } from '../../models/freezeritem';

@Component({
  selector: 'app-freezeritemlist',
  templateUrl: './freezeritemlist.component.html',
  styleUrls: ['./freezeritemlist.component.scss']
})
export class FreezeritemlistComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['content', 'freezedate', 'drawerId', 'actions'];
  dataSource!: FreezerItemDataSource;
  drawers?: Drawer[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private freezerItemService: FreezerItemService,
    private drawerService: DrawerService,
    private freezerItemDataSourceService: FreezerItemDataSource
  ) { }
 
  ngOnInit(): void {
    this.dataSource = new FreezerItemDataSource(this.freezerItemService);
    this.dataSource.loadFreezerItems();

    this.drawerService.getDrawers().subscribe({
      next: data => {
        this.drawers = data;
        //console.log(this.drawers?.find(drawer => drawer.id == 2)) TODO mapping from id to physicalOrder
      }
    });
  }
  
  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  async createFreezerItem() {
    let freezerItem: FreezerItem = {
      id: -1,
      content: "test",
      freezedate: new Date().toISOString(),
      drawerId: -1
    }

    console.log(freezerItem)
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: freezerItem
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}