import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit {
  sourceAddress: string = ''
  sourceLatitude: string = ''
  sourceLongitude: string = ''
  destinationAddress: string = ''
  destinationLatitude: string = ''
  destinationLongitude: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  handleSourceAddressChange(address: any) {
    this.sourceAddress = address.formatted_address
    this.sourceLatitude = address.geometry.location.lat()
    this.sourceLongitude = address.geometry.location.lng()
  }

  handleDestinationAddressChange(address: any) {
    this.destinationAddress = address.formatted_address
    this.destinationLatitude = address.geometry.location.lat()
    this.destinationLongitude = address.geometry.location.lng()
  }
}
