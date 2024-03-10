import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FreezerItem } from '../../models/freezeritem';

@Injectable({
  providedIn: 'root'
})
export class FreezeritemserviceService {
  private path = '/api';

  constructor(private http: HttpClient) {}
  
  getFreezerItems(): Observable<any> {
    return this.http.get<FreezerItem[]>(this.path);
  }
  
}
