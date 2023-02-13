import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class AddressProviderService {
  private axiosInstance: AxiosInstance;

  defaultOptions = {
    enableHighAccuracy: true
  }

  constructor() { 
    this.axiosInstance = axios.create({
        baseURL: 'https://api-adresse.data.gouv.fr/',
        timeout: 1000
    });
  }

  async search(input: string, position?: GeolocationPosition, options: any = this.defaultOptions): Promise<Array<Address>> {
    let params: RequestParameters = {
      q: input,
      limit: 3
    }

    if (position != undefined) {
      params.lat = position.coords.latitude;
      params.lon = position.coords.longitude;
    }
    
    const response = await this.axiosInstance.get('/search/', {params});
    return response.data.features.map((i: any) => new Address(i));
  }

  async reverse(position: GeolocationPosition, limit = 1): Promise<Address> {
    const response = await this.axiosInstance.get('/reverse/', {
      params: {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        limit
      }
    });
    return new Address(response.data.features[0]);
  }

}

interface RequestParameters {
  q: string;
  limit: number;

  lat?: number;
  lon?: number;
}
