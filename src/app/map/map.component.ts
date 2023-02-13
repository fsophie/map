import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Address } from '../model/address';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input('map-id') id = 'leaflet-map';
  @Input('focus') focus: Address|null = null;
  private map!: L.Map;
  markers!: L.LayerGroup;

  customIcon = L.divIcon({
      html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" 
        fill="#C12525" stroke-width="1" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
      </svg>`,
      className: "",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
  });

  constructor() { }

  ngAfterViewInit() {
    this.map = L.map('leaflet-map',{
      center: [ 48.858370, 2.294481 ],
      zoom: 12,
      minZoom: 6,
      zoomControl: false
    });

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.markers = new L.LayerGroup();
    this.map.addLayer(this.markers);
  }

  goTo(address: Address) {
    this.map.flyTo(L.latLng(address.latitude, address.longitude), 16);
    L.marker(L.latLng(address.latitude, address.longitude), {icon: this.customIcon}).addTo(this.markers);
  }

}
