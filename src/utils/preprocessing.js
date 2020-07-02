const PanoTools = import(/* webpackChunkName: "chunk-tools" */'pano-tools')

export default function(source) {
  return new Promise((resolve)=>{
    var img = new Image()
    img.src = source
    img.onload = async () => {
      let outputsize = 1024
      let upscalesize = 16384
      var canvas = document.createElement('canvas')
      canvas.width = upscalesize
      canvas.height = upscalesize / 2
      var context = canvas.getContext('2d')
      context.drawImage(img, 0, 0, canvas.width, canvas.height)
      var data = context.getImageData(0,0, canvas.width, canvas.height).data
      var result_buf = new Uint8ClampedArray(outputsize * outputsize * 4)
      var panoTools = await PanoTools
      var sideImgs = []
      var procanvas = document.createElement('canvas')
      procanvas.width = outputsize
      procanvas.height = outputsize
      var procontext = procanvas.getContext('2d')
      for (var i = 0; i < 6; i++) {
        panoTools.slice(data, canvas.width, canvas.height, outputsize, result_buf, i)
        var imageData = new ImageData(result_buf ,outputsize)
        procontext.putImageData(imageData, 0, 0)
        sideImgs[i] = procanvas.toDataURL("image/jpeg", 1.0)
      }
      resolve(sideImgs)
    }
  })
}
