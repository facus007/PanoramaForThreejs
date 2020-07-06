const MP4Box = require('mp4box');

export default class Video {
  constructor(video, source) {
    this.video = video
    this.source = source

    if(!isSupported()) {
      this.video.src = this.source
      return
    }
    this.fetchBuffer();
  }

  async fetchBuffer(){
    var response = await fetch(this.source)
    var arrayBuffer = await response.arrayBuffer();
    this.mp4boxfile = MP4Box.createFile();
    this.mp4boxfile.onReady = (info) => {
      this.mediaSource = new window.MediaSource()
      this.video.src = URL.createObjectURL(this.mediaSource)
      this.mediaSource.addEventListener('sourceopen', _=>{
        var sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="'+info.videoTracks[0].codec+','+info.audioTracks[0].codec +'"');
        sourceBuffer.addEventListener('updateend', (_) => {
           this.mediaSource.endOfStream();
        });
        sourceBuffer.appendBuffer(arrayBuffer);
      });
    };

    arrayBuffer.fileStart = 0;
    this.mp4boxfile.appendBuffer(arrayBuffer);
  }
}

export function isSupported (){
  return window.MediaSource
}
