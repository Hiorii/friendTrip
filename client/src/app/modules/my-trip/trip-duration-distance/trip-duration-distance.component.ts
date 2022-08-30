import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-trip-duration-distance',
  templateUrl: './trip-duration-distance.component.html',
  styleUrls: ['./trip-duration-distance.component.scss']
})
export class TripDurationDistanceComponent implements OnInit, OnChanges {
  @Input() totalTripDistance: number;
  @Input() totalTripDuration: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalTripDistance = changes['totalTripDistance']?.currentValue;
    this.totalTripDuration = changes['totalTripDuration']?.currentValue;
  }
}
