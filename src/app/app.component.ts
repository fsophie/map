import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from './model/address';
import { AddressWatcherService } from './address-watcher.service';
import { Subscription } from 'rxjs';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'map';
  subscription: Subscription;
  focusedAddress: Address|null = null;

  @ViewChild('map') map!: MapComponent;

  constructor(private addressWatcher: AddressWatcherService) {
    this.subscription = addressWatcher.get().subscribe((address) => {
      if (address != null) {
        this.focusedAddress = address;
        this.map.goTo(address);
      }
    })
  }

  ngOnInit(): void {

  }
}
