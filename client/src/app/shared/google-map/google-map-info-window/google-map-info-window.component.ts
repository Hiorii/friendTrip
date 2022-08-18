import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-google-map-info-window',
  templateUrl: './google-map-info-window.component.html',
  styleUrls: ['./google-map-info-window.component.scss']
})
export class GoogleMapInfoWindowComponent implements OnInit, OnChanges {
  @Input() markerData;
  @Input() currentUser;

  markerAddress: string;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    this.markerData = changes['markerData'].currentValue?.results;
    console.log(this.markerData)
    if (this.markerData?.length) {
      this.markerData.filter(data => {
        if (data.types.includes('route')) {
          this.markerAddress = data.formatted_address;
        }
      })
    }
  }

}
