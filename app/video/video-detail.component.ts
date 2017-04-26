import {Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {screen} from 'platform';
import {SwipeGestureEventData, SwipeDirection} from 'ui/gestures';
import {SlideContainer} from 'nativescript-slides';

import {VideoService} from './video.service';
import {IVideo, IVideoPlaybackInfo} from './video';

@Component({
  selector: 'ns-video-detail',
  moduleId: module.id,
  templateUrl: 'video-detail.component.html'
})
export class VideoDetailComponent implements OnInit, AfterViewInit {
  
  private id: number;
  vidWidth: number;
  vidHeight: number;
  videoThmb: string;
  videoSrc: string;
  @ViewChild('container') container: ElementRef;
  
  videos: IVideo[] = []; 
  videosPlayback: IVideoPlaybackInfo[] = [];

  private _currentId = 0;
  private previewDuration = 5000;
  private playDuration = 0;
  private slideContainer: SlideContainer;

  constructor(
      private activatedRoute: ActivatedRoute,
      private videoService: VideoService
  ) {
    
  }
  
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.slideContainer = <SlideContainer> this.container.nativeElement;
  }

  ngAfterViewInit() {
    this.setExpectedSizes();
    this.videoService.getVideos().then((videos) => {
      this.videos = videos;
      this.videos.map(() => {
        this.videosPlayback.push({startTime: 0, duration: 0, isPlaying: false});
      });
    });
    this.slideContainer.constructView();
  }

  setExpectedSizes(): void {
    this.vidWidth = screen.mainScreen.widthDIPs / 2;
    this.vidHeight = screen.mainScreen.heightDIPs / 4;
  }

  changed(event:SwipeGestureEventData) {
    if (event.direction === SwipeDirection.left) {
      this.slideContainer.nextSlide();
    } else {
      this.slideContainer.previousSlide();
    }
  }

  startScrollingHandler() {
    this.stopVideo(this._currentId);
  }

  finishedScrollingHandler() {

  }

  playVideo(id: number) {
    this.videosPlayback[id].isPlaying = true;
    this._currentId = id;
  }

  stopVideo(id: number) {
    this.videosPlayback[id].isPlaying = false;
  }

  previewVideo(id: number) {
  }

  loadedHandler() {
    this.slideContainer.goToSlide(this.id);
  }
}