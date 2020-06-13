<template>
  <span>
    <preview/>
  </span>
</template>

<script>
import settings from "@/settings"

export default {
  components:{ preview: ()=>import('@/views/preview') },
  data(){return {loaded:false}},
  created(){
    document.title = ''
  },
  destroyed(){
    document.title = settings.title
  }
}

</script>
