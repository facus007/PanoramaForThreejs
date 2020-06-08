<template>
  <preview/>
</template>

<script>
import preview from '@/views/preview'
import settings from "@/settings"

export default {
  components:{preview},
  created(){
    document.title = ''
  },
  destroyed(){
    document.title = settings.title
  }
}

</script>
