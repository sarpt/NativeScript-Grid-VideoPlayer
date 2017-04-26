export interface IVideo {
  id: number,
  src: string,
  thmb: string
}

export interface IVideoPlaybackInfo {
  startTime: number,
  duration: number,
  isPlaying: boolean
}