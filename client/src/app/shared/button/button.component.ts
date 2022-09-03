import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() title: string;
  @Input() disabled: boolean = false
  @Input() background: string;
  @Input() iconName: string;
  @Input() iconColor: string;
  @Input() marginTop: string = '2rem'

  @Output() handleOnClick = new EventEmitter<Event>();
  backgroundImage: string;

  onClickEvent(event: Event) {
    this.handleOnClick.emit(event)
  }

  ngOnInit(): void {
    if (this.background) {
      this.backgroundImage = 'none';
    }
  }
}
