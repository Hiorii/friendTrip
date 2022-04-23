import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false

  ngOnInit() {
    if (localStorage.getItem('user')) {
      // logged in so return true
      this.isLoggedIn = true
    }
  }
}
