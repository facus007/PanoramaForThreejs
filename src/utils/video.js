export default class Video {
  constructor(video, source) {
    this.video = video
    this.source = source
    this.mediaSource = 'MediaSource' in window && new MediaSource()
    this.video.src = this.mediaSource || this.source

    if(!this.mediaSource) {return}
  }

  async fetchBuffer(){
    let response = await fetch(this.source)
    let arrayBuffer = await response.arrayBuffer();
    arrayBuffer.fileStart = 0;
  }

  dispose() {
    this.isDisposed = true
  }

      // mediaSource: MediaSource && new MediaSource(),
      // init: function (el, assetUrl, mimeCodec) {
      //     this.video = el
      //     this.assetUrl = assetUrl;
      //     this.mimeCodec = mimeCodec;
      //     this.start();// 开启
      // },
      // start: function () {
      //     this.video.src = URL.createObjectURL(this.mediaSource);
      //     this.mediaSource.addEventListener('sourceopen', this.sourceOpen.bind(this));// bind(this) 保证回调
      // },
      // // MediaSource sourceopen 事件处理
      // sourceOpen: function (_) {
      //     var _this = this;
      //     var sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeCodec);
      //     this.fetchAB(this.assetUrl, function (buf) {
      //         sourceBuffer.addEventListener('updateend', function (_) {
      //             _this.mediaSource.endOfStream();// 结束
      //             _this.video.play(); // 播放视频
      //         });
      //         sourceBuffer.appendBuffer(buf);
      //     });
      // },
}
