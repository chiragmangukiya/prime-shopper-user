import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private subject = new Subject<any>();

  sendCLickEvent(Data: any){
    this.subject.next(Data);
  }

  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }

}
