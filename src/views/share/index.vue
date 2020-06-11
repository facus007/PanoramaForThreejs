<template>
  <span>
    <preview/>
  </span>
</template>

<script>
import preview from '@/views/preview'
import settings from "@/settings"

export default {
  components:{preview},
  data(){return {loaded:false}},
  created(){
    document.title = ''
    // fetch('../../assets/img/loading_sprite.png').then(()=>this.loaded = true)

  },
  destroyed(){
    document.title = settings.title
  }
}

</script>
