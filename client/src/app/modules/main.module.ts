import { NgModule } from '@angular/core';
import {AuthModule} from "./auth/auth.module";
import {CommonModule} from "@angular/common";
import {MainComponent} from "./main.component";
import { AddTripComponent } from './add-trip/add-trip.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { JournalComponent } from './journal/journal.component';
import { MyTripComponent } from './my-trip/my-trip.component';
import { ToDoComponent } from './to-do/to-do.component';
import {AddTripModule} from "./add-trip/add-trip.module";
import {HighlightsModule} from "./highlights/highlights.module";
import {JournalModule} from "./journal/journal.module";
import {MyTripModule} from "./my-trip/my-trip.module";
import {ToDoModule} from "./to-do/to-do.module";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {UserMenuModule} from "./user-menu/user-menu.module";
import { NotificationsComponent } from './notifications/notifications.component';
import {NotificationsModule} from "./notifications/notifications.module";

@NgModule({
  declarations: [MainComponent],
    exports: [
        MainComponent,
    ],
  imports: [
    CommonModule,
    AuthModule,
    AddTripModule,
    HighlightsModule,
    JournalModule,
    MyTripModule,
    ToDoModule,
    NotificationsModule,
    UserMenuModule,
    RouterModule
  ]
})
export class MainModule { }
