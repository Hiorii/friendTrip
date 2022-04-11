import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm} from "@angular/forms";

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss']
})
export class MyTripComponent implements OnInit {

  originPoint: string
  destinationPoint: string




  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

}
