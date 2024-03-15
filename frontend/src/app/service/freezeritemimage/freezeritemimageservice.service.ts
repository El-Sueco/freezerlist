import { Injectable } from '@angular/core';
import { FreezerItemImage } from '../../models/freezeritemimage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreezeritemimageserviceService {
  private path = '/api/freezerItems';
  private pathSub = '/images';

  constructor(private http: HttpClient) {}

  createOrUpdateImage(id: number, freezeritemimage: FreezerItemImage): Observable<any> {
    return this.http.put<FreezerItemImage>(this.path + "/" + id  + this.pathSub, freezeritemimage)
  }

  getImage(id: number): Observable<any> {
    return this.http.get<FreezerItemImage>(this.path + "/" + id + this.pathSub)
  }

  deleteImage(id: number): Observable<any> {
    return this.http.get<FreezerItemImage>(this.path + "/" + id + this.pathSub)
  }
}
