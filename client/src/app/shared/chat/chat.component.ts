import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {ChatService} from "./chat.service";
import {MessageModel} from "../../core/interfaces/message.model";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {UsersModel} from "../../core/interfaces/users.model";
import {TripApiService} from "../../core/services/api/trip-api.service";
import {Store} from "@ngrx/store";
import {selectTripMessages} from "../../core/store/trips";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges, AfterViewChecked {
  chatForm = this.fb.group({
    message: [''],
  })

  messages: MessageModel[] = [];
  currentUser: Partial<UsersModel>;

  @Input() tripId: string;
  @Input() tripMessages: any;
  @Output() isChatVisible = new EventEmitter<boolean>();

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private localStorageService: LocalStorageService,
    private tripApiService: TripApiService,
    private store: Store
  ) { }

  ngOnInit() {
    this.scrollToBottom();

    this.currentUser = this.localStorageService.getItem('user');

    return this.chatService.getNewMessage().subscribe((message: MessageModel) => {
      this.messages = Object.assign([], this.messages)
      this.messages.push(message);

      this.tripApiService.addNewMessages(this.tripId, this.messages).subscribe(_ => {})
    })
  }

  ngOnChanges() {
    this.store.select(selectTripMessages).subscribe(data => {
      data.forEach(el => {
        this.messages = el.messages
      })
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onSubmit(e: any) {
    e.preventDefault();

    if (!this.chatForm.value.message) return;

    this.chatService.sendMessage({ from: this.currentUser.name, message: this.chatForm.value.message });

    this.chatForm.reset();
  }

  closeChatRoom() {
    this.isChatVisible.emit(false);
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
