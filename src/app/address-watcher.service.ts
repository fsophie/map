import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Address } from './model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressWatcherService {

  private addressSubject = new Subject<Address|null>;

  constructor() { }

  send(address: Address) {
    this.addressSubject.next(address);
  }

  flush() {
    this.addressSubject.next(null);
  }

  get(): Observable<Address|null> {
    return this.addressSubject.asObservable()
  }

}
