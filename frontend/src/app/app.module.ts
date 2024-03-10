import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from "angular-datatables";
import { FreezeritemlistComponent } from './components/freezeritemlist/freezeritemlist.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatefreezeritemComponent } from './components/dialogs/createdialog/createfreezeritem/createfreezeritem.component';
import { GetorupdatefreezeritemComponent } from './components/dialogs/getorupdatedialog/getorupdatefreezeritem/getorupdatefreezeritem.component';
import { DeletefreezeritemComponent } from './components/dialogs/deletedialog/deletefreezeritem/deletefreezeritem.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FreezeritemlistComponent,
    CreatefreezeritemComponent,
    GetorupdatefreezeritemComponent,
    DeletefreezeritemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
