import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {removeTripWaypointAction} from "../../../../core/store/trips/trips.actions";

@Component({
  selector: 'app-waypoint',
  templateUrl: './waypoint.component.html',
  styleUrls: ['./waypoint.component.scss']
})
export class WaypointComponent implements OnInit, OnChanges {
  @Input() waypointsData;
  @Input() tripId;
  @Input() currentUser;

  constructor(private store: Store) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.waypointsData = changes['waypointsData'].currentValue;

    if (this.waypointsData?.length) {
      this.setArrayWithoutDuplicates();
    }
  }

  onRemoveWaypoint(id: string) {
    this.store.dispatch(removeTripWaypointAction({ id: this.tripId, currentUser: this.currentUser, waypointId: id }))
  }

  private setArrayWithoutDuplicates() {
    let newArr = [...new Set(this.waypointsData)];
    this.waypointsData = newArr;
  }
}
