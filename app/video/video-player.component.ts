import {Component, Input, Output, ViewChildren, ElementRef, QueryList, AfterViewInit, EventEmitter, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Video} from 'nativescript-videoplayer';

@Component({
  selector: 'ns-videoplayer',
  moduleId: module.id,
  templateUrl: 'video-player.component.html',
  styleUrls: ['video-player.component.css']
})
export class VideoPlayer implements AfterViewInit, OnDestroy {

  @Output() swipe = new EventEmitter();
  @Output() tap = new EventEmitter();
  @Output() longPress = new EventEmitter();
  @Output() videoFinished = new EventEmitter();
  @Output() currentTime = new EventEmitter();

  @Input() videoSrc: string;
  @Input() thmbSrc: string;
  @Input() fill: boolean;
  @Input() autoplay: boolean;
  @Input() vidWidth: number;
  @Input() vidHeight: number;

  @ViewChildren('vid') videoElement: QueryList<ElementRef>;

  videoReadyCallback: () => void;

  currentTimeIntervalId: number;
  showVideo: boolean;
  videoElementSubscription: Subscription;

  private _videoPlaying: boolean;

  constructor() {
    this.showVideo = false;
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.currentTimeStopInterval();
  }

  @Input()
  set videoPlaying(play: boolean) {
    if (play) {
      this.videoReadyCallback = () => {
        this.playVideo();
      }
    } else {
      if (this.showVideo) {
        this.stopVideo();
      }
    }
    this._videoPlaying = play;
    this.showVideo = play;
  }

  currentTimeStartInterval(): void {
    if (!this.currentTimeIntervalId) {
      let videoPlayer = <Video> this.videoElement.first.nativeElement;
      this.currentTimeIntervalId = setInterval(() => {
        this.currentTime.emit(videoPlayer.getCurrentTime());
      }, 500);
    }
  }

  currentTimeStopInterval(): void {
    if (this.currentTimeIntervalId) {
      clearInterval(this.currentTimeIntervalId); 
      this.currentTimeIntervalId = undefined;
    }
  }

  longPressHandler(event): void {
    this.longPress.emit(event);
  }

  tapHandler(event): void {
    this.tap.emit(event);
  }

  swipeHandler(event): void {
    this.swipe.emit(event);
  }

  playVideo(): void {
    let videoPlayer = <Video> this.videoElement.first.nativeElement;
    videoPlayer.play();
    this.currentTimeStartInterval();
  }

  stopVideo(): void {
    let videoPlayer = <Video> this.videoElement.first.nativeElement;
    videoPlayer.stop();
    this.currentTimeStopInterval();
  }

  pauseVideo(): void {

  }

  finishedHandler(): void {
    this.videoFinished.emit();
  }

  playbackReadyHandler(): void {
    this.videoReadyCallback();
  }
}