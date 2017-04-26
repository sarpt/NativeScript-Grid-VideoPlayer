import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { VideoGridComponent } from "./video/video-grid.component";
import { VideoDetailComponent } from "./video/video-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/videos", pathMatch: "full" },
    { path: "videos", component: VideoGridComponent },
    { path: "video/:id", component: VideoDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }