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
import { EditDialogComponent } from '../dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete.dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-freezeritemlist',
  templateUrl: './freezeritemlist.component.html',
  styleUrls: ['./freezeritemlist.component.scss']
})
export class FreezeritemlistComponent implements OnInit  {

  displayedColumns: string[] = ['content', 'freezedate', 'drawerId', 'actions'];
  dataSource!: MatTableDataSource<FreezerItem>;
  drawers?: Drawer[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private freezerItemService: FreezerItemService,
    private drawerService: DrawerService
  ) { }
 
  ngOnInit(): void {
    this.loadFreezerItems();

    this.drawerService.getDrawers().subscribe({
      next: data => {
        this.drawers = data;
        // TODO mapping from id to physicalOrder
        //console.log(this.drawers?.find(drawer => drawer.id == 2)) 
      }
    });
  }

  loadFreezerItems() {
    this.freezerItemService.getFreezerItems().subscribe(freezerItem => {
      this.dataSource = new MatTableDataSource(freezerItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  createFreezerItem() {
    let freezerItem: FreezerItem = {
      id: null,
      content: null,
      freezedate: new Date().toISOString(),
      drawerId: null
    }
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '500px',
      maxHeight: '100%',
      data: freezerItem
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadFreezerItems();
    });
  }

  editFreezerItem(id: number) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      maxHeight: '100%',
      data: {id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadFreezerItems();
    });
  }

  deleteFreezerItem(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      maxHeight: '100%',
      data: {id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadFreezerItems();
    });
  }
}