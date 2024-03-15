import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, take } from 'rxjs';
import { FreezerItem } from '../../models/freezeritem';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class FreezeritemserviceService {
  private path = '/api/freezerItems';

  constructor(private http: HttpClient) {}
  
  getFreezerItems(): Observable<any> {
    return this.http.get<FreezerItem[]>(this.path);
  }

  getFreezerItem(id: number): Observable<any> {
    return this.http.get<FreezerItem>(this.path + "/" + id)
  }

  deleteFreezerItem(id: number): Observable<any> {
    return this.http.delete<FreezerItem>(this.path + "/" + id)
  }

  updateFreezerItem(id: number, freezeritem: FreezerItem): Observable<any> {
    return this.http.put<FreezerItem>(this.path + "/" + id, freezeritem)
  }

  createFreezerItem(freezeritem: FreezerItem): Observable<any> {
    return this.http.post<FreezerItem>(this.path, freezeritem)
  }
  
}
