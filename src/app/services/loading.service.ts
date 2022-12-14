import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  start() {
    this._loading.next(true);
  }

  end() {
    this._loading.next(false);
  }

}
