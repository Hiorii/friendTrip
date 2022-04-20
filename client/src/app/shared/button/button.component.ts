import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() title: string;
  @Input() disabled: boolean = false

  @Output() handleOnClick = new EventEmitter<Event>();

  onClickEvent(event: Event) {
    this.handleOnClick.emit(event)
  }
}
