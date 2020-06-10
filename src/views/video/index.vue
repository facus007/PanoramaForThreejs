<template>
  <div :style="{position:'absolute',left:0,top:0,...layout}">
    <video :src="link" loop controls muted :style="{'width':width,'height':height}" ref="video" />
  </div>
</template>
<script>
const layout = {
  '0':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'flex-start', width: '100%', height: '100%' },
  '1':{display:'flex', 'justify-content': 'center', 'align-items': 'flex-start', width: '100%' , height: '100%'},
  '2':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'flex-start' , width: '100%', height: '100%'},
  '3':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'center', width: '100%' , height: '100%'},
  '4':{display:'flex', 'justify-content': 'center', 'align-items': 'center' , width: '100%', height: '100%'},
  '5':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'center', width: '100%' , height: '100%'},
  '6':{display:'flex', 'justify-content': 'flex-start', 'align-items': 'flex-end', width: '100%' , height: '100%'},
  '7':{display:'flex', 'justify-content': 'center', 'align-items': 'flex-end' , width: '100%', height: '100%'},
  '8':{display:'flex', 'justify-content': 'flex-end', 'align-items': 'flex-end', width: '100%' , height: '100%'},
}

export default {
  computed:{
    layout(){
      return layout[this.$route.query.layout]
    },
    link(){
      return this.$route.query.link
    },
    width(){
      return this.$route.query.width
    },
    height(){
      return this.$route.query.height
    }
  },
  mounted(){
    this.$refs.video.play()
  }
}
</script>
