import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {removeTripMarkersAction} from "../../../core/store/trips/trips.actions";

@Component({
  selector: 'app-google-map-info-window',
  templateUrl: './google-map-info-window.component.html',
  styleUrls: ['./google-map-info-window.component.scss']
})
export class GoogleMapInfoWindowComponent implements OnInit, OnChanges {
  @Input() markerData;
  @Input() currentUser;
  @Input() tripData;
  @Input() currentMarkerId;

  markerAddress: string;

  constructor(private store: Store) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    this.markerData = changes['markerData']?.currentValue?.results;
    if (this.markerData?.length) {
      this.markerData.filter(data => {
        if (data.types.includes('route')) {
          this.markerAddress = data.formatted_address;
        }
      })
    }
  }

  removeMarker() {
    this.store.dispatch(removeTripMarkersAction({ id: this.tripData.id, currentUser: this.currentUser, markerId: this.currentMarkerId }))
  }
}
