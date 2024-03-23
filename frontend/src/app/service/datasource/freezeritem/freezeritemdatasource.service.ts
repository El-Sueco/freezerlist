import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { FreezerItem } from '../../../models/freezeritem';
import { BehaviorSubject, Observable, catchError, finalize, of } from 'rxjs';
import { FreezerItemService } from '../../freezeritem/freezeritem.service';

@Injectable({
  providedIn: 'root'
})
export class FreezerItemDataSource implements DataSource<FreezerItem> {

  private freezeritemSubject = new BehaviorSubject<FreezerItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private freezerItemService: FreezerItemService) { }
  
  connect(collectionViewer: CollectionViewer): Observable<FreezerItem[]> {
    return this.freezeritemSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.freezeritemSubject.complete();
    this.loadingSubject.complete();
  }

  loadFreezerItems() {
    this.loadingSubject.next(true);

    this.freezerItemService.getFreezerItems().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(freezeritems => this.freezeritemSubject.next(freezeritems));
  }
}
