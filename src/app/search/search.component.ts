import { Component, EventEmitter, Output } from '@angular/core';
import { AddressProviderService } from '../service/address-provider.service';
import { Address } from '../model/address';
import { AddressWatcherService } from '../address-watcher.service';
import { LocateUserService } from '../service/locate-user.service';
import { PosAnimation } from 'leaflet';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searching = false;

  input: string = "";
  suggestions: Array<Address> = [];
  errorMessage: String|null = null;

  constructor(private addressProvider: AddressProviderService, 
    private addressWatcher: AddressWatcherService, private locateUser: LocateUserService) {}

  search() {
    if (this.searching || this.input.length < 5) return;
    this.searching = true;
    let coords: GeolocationPosition;
    this.locateUser.getPosition().then((position) => {
      coords = position;
    })
    .finally(() => {
      this.addressProvider.search(this.input, coords).then((addresses: Array<Address>) => {
        this.suggestions = addresses;
        this.errorMessage = null;
      })
      .catch((reason) => {
        console.log(reason);
        this.errorMessage = "Impossible de trouver cette adresse";
      })
      .finally(() => {
        this.searching = false;
      })
    });
  }

  select(address: Address) {
    this.errorMessage = null;
    this.addressWatcher.send(address);
    this.suggestions = [];
    this.input = address.label;
  }

  locateMe() {
    this.locateUser.getPosition().then((position) => {
      this.addressProvider.reverse(position)
        .then((address) => {
          this.errorMessage = null;
          this.select(address);
        })
        .catch(() => {
          this.errorMessage = "Impossible d'obtenir une adresse correspondante";
        })
    })
    .catch(() => {
      this.errorMessage = "Impossible d'obtenir votre position";
    })
  }

}
