import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocateUserService {

  constructor() { }

  getPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }

}
