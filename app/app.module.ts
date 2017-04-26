import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { VideoGridComponent } from './video/video-grid.component';
import { VideoPlayer } from './video/video-player.component';
import { VideoService } from './video/video.service';
import { VideoDetailComponent } from "./video/video-detail.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        VideoGridComponent,
        VideoPlayer,
        VideoDetailComponent
    ],
    providers: [
        VideoService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
