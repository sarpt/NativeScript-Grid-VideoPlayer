import {Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList, AfterViewInit} from '@angular/core';
import {RouterExtensions} from 'nativescript-angular/router'
import {GridLayout} from 'ui/layouts/grid-layout';
import {VideoService} from './video.service';

import {IVideo, IVideoPlaybackInfo} from './video';
import {screen} from "platform";


@Component({
  selector: 'ns-videogrid',
  moduleId: module.id,
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.css']
})
export class VideoGridComponent implements OnInit, AfterViewInit {

  videos: IVideo[] = [];
  videosPlayback: IVideoPlaybackInfo[] = [];
  colWidth: number;
  rowHeight: number;
  gridLayout: GridLayout;
  @ViewChild('grid') grid: ElementRef;

  constructor(
    private videoService: VideoService,
    private routerService: RouterExtensions
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setExpectedSizes();
    this.videoService.getVideos().then((videos) => {
      this.videos = videos;
      this.videos.map(() => {
        this.videosPlayback.push({startTime: 0, duration: 5000, isPlaying: false});
      });
    });
  }

  setExpectedSizes(): void {
      //let tgt = <GridLayout> this.grid.nativeElement;
      this.colWidth = screen.mainScreen.widthDIPs / 2;
      this.rowHeight = screen.mainScreen.heightDIPs / 4;
      //this.colWidth = tgt.getMeasuredWidth() / 2;
      //this.rowHeight = tgt.getMeasuredHeight() / 4;
  }

  calculateCol(idx: number): number {
    return idx % 2;
  }

  calculateRow(idx: number): number {
    return Math.floor(idx / 2);
  }

  openDetail(idx: number): void {
    this.routerService.navigate(['/video', idx]);
  }

  currentTimeCheck(currentTime: number, idx: number): void {
    if (this.videosPlayback[idx].duration <= currentTime) {
      this.stopPlayback(idx);
    } 
  }

  playPreview(idx: number): void {
    this.videosPlayback[idx].isPlaying = true;
  }

  stopPlayback(idx: number): void {
    this.videosPlayback[idx].isPlaying = false;
  }

}