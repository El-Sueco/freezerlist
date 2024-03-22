import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FreezerItem } from '../../../models/freezeritem';

@Component({
  selector: 'app-create.dialog',
  templateUrl: '../../dialogs/create/create.dialog.html',
  styleUrls: ['../../dialogs/create/create.dialog.css']
})

export class CreateDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public freezerItem: FreezerItem
  ) { }

  onSubmit(form: any): void {
      this.dialogRef.close();
    }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
